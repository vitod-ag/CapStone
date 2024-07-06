package it.nextdevs.WinningStrategy.service;

import com.cloudinary.Cloudinary;
import it.nextdevs.WinningStrategy.dto.UserDataDto;
import it.nextdevs.WinningStrategy.dto.UserDto;
import it.nextdevs.WinningStrategy.enums.TipoUtente;
import it.nextdevs.WinningStrategy.exception.BadRequestException;
import it.nextdevs.WinningStrategy.exception.NotFoundException;
import it.nextdevs.WinningStrategy.model.User;
import it.nextdevs.WinningStrategy.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private JavaMailSenderImpl javaMailSender;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public Integer saveUser(UserDto userDto) {
        if (getUserByEmail(userDto.getEmail()).isEmpty()) {
            User user = new User();
            user.setNome(userDto.getNome());
            user.setCognome(userDto.getCognome());
            user.setUsername(userDto.getUsername());
            user.setEmail(userDto.getEmail());
            user.setTipoUtente(TipoUtente.USER);
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));

            userRepository.save(user);
            sendMailRegistrazione(userDto.getEmail());

            return user.getIdUtente();
        } else {
            throw new BadRequestException("L'utente con email " + userDto.getEmail() + " già esistente");
        }
    }

    public Page<User> getAllUsers(int page, int size , String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return userRepository.findAll(pageable);
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public User updateUser(int id, UserDto userDto) {
        Optional<User> userOptional = getUserById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setNome(userDto.getNome());
            user.setCognome(userDto.getCognome());
            user.setUsername(userDto.getUsername());
            user.setEmail(userDto.getEmail());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            return userRepository.save(user);
        } else {
            throw new NotFoundException("User with id:" + id + " not found");
        }
    }

    public String deleteUser(int id) {
        Optional<User> userOptional = getUserById(id);

        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
            return "User with id:" + id + " correctly deleted";
        } else {
            throw new NotFoundException("User with id:" + id + " not found");
        }
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDataDto patchUser(Integer id, UserDto userDto) {
        Optional<User> userOptional = getUserById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (userDto.getUsername() != null) {
                user.setUsername(userDto.getUsername());
            }
            if (userDto.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            }
            if (userDto.getNome() != null) {
                user.setNome(userDto.getNome());
            }
            if (userDto.getCognome() != null) {
                user.setCognome(userDto.getCognome());
            }
            if (userDto.getEmail() != null) {
                user.setEmail(userDto.getEmail());
            }
            if (userDto.getAvatar() != null) {
                user.setAvatar(userDto.getAvatar());
            }
            userRepository.save(user);
            UserDataDto userDataDto = new UserDataDto();
            userDataDto.setNome(user.getNome());
            userDataDto.setCognome(user.getCognome());
            userDataDto.setAvatar(user.getAvatar());
            userDataDto.setEmail(user.getEmail());
            userDataDto.setUsername(user.getUsername());
            userDataDto.setIdUtente(user.getIdUtente());
            userDataDto.setTipoUtente(user.getTipoUtente());
            return userDataDto;
        } else {
            throw new NotFoundException("Utente con id "+id+" non trovato");
        }
    }

    public UserDataDto patchAvatarUser(Integer id, MultipartFile avatar) throws IOException {
        Optional<User> userOptional = getUserById(id);

        if (userOptional.isPresent()) {
            String url = (String) cloudinary.uploader().upload(avatar.getBytes(), Collections.emptyMap()).get("url");
            User user = userOptional.get();
            user.setAvatar(url);
            userRepository.save(user);
            UserDataDto userDataDto = new UserDataDto();
            userDataDto.setNome(user.getNome());
            userDataDto.setCognome(user.getCognome());
            userDataDto.setAvatar(user.getAvatar());
            userDataDto.setEmail(user.getEmail());
            userDataDto.setUsername(user.getUsername());
            userDataDto.setIdUtente(user.getIdUtente());
            userDataDto.setTipoUtente(user.getTipoUtente());
            return userDataDto;
        } else {
            throw new NotFoundException("Utente con id "+id+" non trovato");
        }
    }

    private void sendMailRegistrazione(String email) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("Registrazione Utente avvenuta con successo");

            String htmlMsg = """
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        color: #333;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        padding-bottom: 20px;
                        border-bottom: 1px solid #e0e0e0;
                    }
                    .header img {
                        width: 200px;
                        height: auto;
                        border-radius: 50%;
                    }
                    .content {
                        padding: 20px;
                        line-height: 1.6;
                    }
                    .content p {
                        margin: 0 0 15px;
                    }
                    .footer {
                        text-align: center;
                        padding-top: 20px;
                        border-top: 1px solid #e0e0e0;
                        font-size: 12px;
                        color: #888;
                    }
                    .button {
                        display: inline-block;
                        padding: 12px 25px;
                        font-size: 16px;
                        color: #ffffff !important;
                        background-color: #007bff;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 20px;
                    }
                    .social-icons {
                        text-align: center;
                        margin-top: 20px;
                    }
                    .social-icons img {
                        width: 30px;
                        height: auto;
                        margin: 0 10px;
                    }
                    .greeting {
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 15px;
                    }
                    .important-info {
                        background-color: #f9f9f9;
                        border-left: 4px solid #007bff;
                        padding: 10px;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src='cid:logoImage' alt="Company Logo">
                    </div>
                    <div class="content">
                        <p class="greeting">Gentile Utente,</p>
                        <p>La tua registrazione è avvenuta con successo!</p>
                        <p>Puoi ora accedere al sistema utilizzando le credenziali fornite durante la registrazione.</p>
                        <p>Se hai domande o necessiti di assistenza, non esitare a contattarci all'indirizzo <a href="mailto:support@example.com">support@example.com</a>.</p>
                        <div class="important-info">
                            <p><strong>Informazioni Importanti:</strong></p>
                            <p>Assicurati di completare il tuo profilo e di aggiornare la tua password per garantire la sicurezza del tuo account.</p>
                        </div>
                        <p>Grazie per esserti registrato!</p>
                        <p>Distinti saluti,</p>
                        <p>Il Team di Supporto</p>
                        <a href="http://localhost:4200" class="button">Accedi</a>
                    </div>
                    <div class="social-icons">
                        <a href="https://facebook.com"><img src="cid:facebookIcon" alt="Facebook"></a>
                        <a href="https://twitter.com"><img src="cid:twitterIcon" alt="Twitter"></a>
                        <a href="https://instagram.com"><img src="cid:instagramIcon" alt="Instagram"></a>
                    </div>
                    <div class="footer">
                        Copyright © 2024 BrokerSphere. Tutti i diritti riservati.<br>
                        <a href="http://www.example.com/unsubscribe">Disiscriviti</a> | <a href="http://www.example.com/privacy">Privacy</a>
                    </div>
                </div>
            </body>
            </html>
            """;

            helper.setText(htmlMsg, true);

            // Add the inline image with content ID 'logoImage'
            ClassPathResource imageResource = new ClassPathResource("static/images/logo.png");
            helper.addInline("logoImage", imageResource);

            // Add social media icons
            ClassPathResource facebookIcon = new ClassPathResource("static/images/facebook.png");
            ClassPathResource twitterIcon = new ClassPathResource("static/images/twitter.webp");
            ClassPathResource instagramIcon = new ClassPathResource("static/images/instagram.png");
            helper.addInline("facebookIcon", facebookIcon);
            helper.addInline("twitterIcon", twitterIcon);
            helper.addInline("instagramIcon", instagramIcon);

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            logger.error("Errore nell'invio dell'email a {}", email, e);
        }
    }
}
