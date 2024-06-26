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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Map;
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
                AuthDataDto authDataDto = new AuthDataDto();
                Integer id = userService.saveUser(userDto);
                utenteOptional = userService.getUserById(id);
                if (utenteOptional.isPresent()) {
                    UserDataDto userDataDto = new UserDataDto();
                    User utente = utenteOptional.get();
                    userDataDto.setAvatar(utente.getAvatar());
                    userDataDto.setNome(utente.getNome());
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

    }
}

