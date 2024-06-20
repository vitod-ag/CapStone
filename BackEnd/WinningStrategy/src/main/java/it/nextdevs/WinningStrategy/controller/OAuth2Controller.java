package it.nextdevs.WinningStrategy.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import it.nextdevs.WinningStrategy.dto.AuthDataDto;
import it.nextdevs.WinningStrategy.dto.UserDataDto;
import it.nextdevs.WinningStrategy.dto.UserDto;
import it.nextdevs.WinningStrategy.exception.BadRequestException;
import it.nextdevs.WinningStrategy.exception.NotFoundException;
import it.nextdevs.WinningStrategy.model.User;
import it.nextdevs.WinningStrategy.repository.UserRepository;
import it.nextdevs.WinningStrategy.security.JwtTool;
import it.nextdevs.WinningStrategy.service.PasswordGenerator;
import it.nextdevs.WinningStrategy.service.UserService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
public class OAuth2Controller {
    private final OAuth2AuthorizedClientService clientService;
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtTool jwtTool;

    @Autowired
    public OAuth2Controller(OAuth2AuthorizedClientService clientService) {
        this.clientService = clientService;
    }

//    @GetMapping("/auth/login/oauth2/code/{provider}")
//    public Integer loginSuccess(@PathVariable String provider,@AuthenticationPrincipal OAuth2AuthenticationToken authenticationToken) {
//
//        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
//                authenticationToken.getAuthorizedClientRegistrationId(),
//                authenticationToken.getName()
//        );
//
//        Map<String, Object> attributes = authenticationToken.getPrincipal().getAttributes();
//        String userEmail = (String) attributes.get("email");
//
//        Optional<User> existingUser = userRepository.findByEmail(userEmail);
//        if (existingUser.isEmpty()) {
//            UserDto userDto = new UserDto();
//            userDto.setEmail(userEmail);
//            userDto.setPassword(PasswordGenerator.generatePassword(32));
//            userDto.setUsername(userEmail);
//            userDto.setProvider(provider);
//            if (Objects.equals(provider, "Google")) {
//                userDto.setNome((String) attributes.get("given_name"));
//                userDto.setCognome((String) attributes.get("family_name"));
//            } else if (Objects.equals(provider, "Facebook")) {
//                userDto.setNome((String) attributes.get("first_name"));
//                userDto.setCognome((String) attributes.get("last_name"));
//            }
//            userDto.setNewsletter(false);
//            return userService.saveUser(userDto);
//        } else {
//            return existingUser.get().getIdUtente();
//        }
//    }

    @PostMapping("/auth/login/oauth2/code/{provider}")
    public AuthDataDto loginSuccess(@PathVariable String provider, @RequestBody Map<String, String> request) throws GeneralSecurityException, IOException {
        String idTokenString = request.get("token");
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken!= null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            String userId = payload.getSubject();
            String email = payload.getEmail();
            boolean emailVerified = payload.getEmailVerified();
            String name = (String) payload.get("given_name");
            String surname = (String) payload.get("family_name");
            String pictureUrl = (String) payload.get("picture");

            Optional <User> utenteOptional = userService.getUserByEmail(email);

            if (utenteOptional.isEmpty()) {
                UserDto userDto = new UserDto();
                userDto.setEmail(email);
                userDto.setPassword(PasswordGenerator.generatePassword(32));
                userDto.setUsername(email);
                userDto.setProvider(provider);
                userDto.setAvatar(pictureUrl);
                userDto.setNome(name);
                userDto.setCognome(surname);
//                userDto.setNewsletter(false);
                AuthDataDto authDataDto = new AuthDataDto();
                Integer id = userService.saveUser(userDto);
                utenteOptional = userService.getUserById(id);
                if (utenteOptional.isPresent()) {
                    UserDataDto userDataDto = new UserDataDto();
                    User utente = utenteOptional.get();
                    userDataDto.setAvatar(utente.getAvatar());
                    userDataDto.setNome(utente.getNome());
                    //userDataDto.setNewsletter(utente.isNewsletter());
                    userDataDto.setEmail(utente.getEmail());
                    userDataDto.setCognome(utente.getCognome());
                    userDataDto.setIdUtente(utente.getIdUtente());
                    userDataDto.setTipoUtente(utente.getTipoUtente());
                    userDataDto.setUsername(utente.getUsername());
                    authDataDto.setUser(userDataDto);
                    authDataDto.setAccessToken(jwtTool.createToken(utente));
                    return authDataDto;
                } else {
                    throw new NotFoundException("Utente non trovato");
                }
            } else {
                AuthDataDto authDataDto = new AuthDataDto();
                UserDataDto userDataDto = new UserDataDto();
                User utente = utenteOptional.get();
                userDataDto.setAvatar(utente.getAvatar());
                userDataDto.setNome(utente.getNome());
               // userDataDto.setNewsletter(utente.isNewsletter());
                userDataDto.setEmail(utente.getEmail());
                userDataDto.setCognome(utente.getCognome());
                userDataDto.setIdUtente(utente.getIdUtente());
                userDataDto.setTipoUtente(utente.getTipoUtente());
                userDataDto.setUsername(utente.getUsername());
                authDataDto.setUser(userDataDto);
                authDataDto.setAccessToken(jwtTool.createToken(utente));
                return authDataDto;
            }
        } else {
            throw new BadRequestException("Token Google non valido");
        }
//        System.out.println(authenticationToken);
//        if (authenticationToken == null) {
//            // Handle the case where authenticationToken is null
//            throw new IllegalStateException("Authentication token is missing.");
//        }

//        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
//                authenticationToken.getAuthorizedClientRegistrationId(),
//                authenticationToken.getName()
//        );
//
//        Map<String, Object> attributes = authenticationToken.getPrincipal().getAttributes();
//        String userEmail = (String) attributes.get("email");
//
//        Optional<User> existingUser = userRepository.findByEmail(userEmail);
//        if (existingUser.isEmpty()) {
//            UserDto userDto = new UserDto();
//            userDto.setEmail(userEmail);
//            userDto.setPassword(PasswordGenerator.generatePassword(32));
//            userDto.setUsername(userEmail);
//            userDto.setProvider(provider);
//            if (Objects.equals(provider, "Google")) {
//                userDto.setNome((String) attributes.get("given_name"));
//                userDto.setCognome((String) attributes.get("family_name"));
//            } else if (Objects.equals(provider, "Facebook")) {
//                userDto.setNome((String) attributes.get("first_name"));
//                userDto.setCognome((String) attributes.get("last_name"));
//            }
//            userDto.setNewsletter(false);
//            return userService.saveUser(userDto);
//        } else {
//            return existingUser.get().getIdUtente();
//        }
    }


}

