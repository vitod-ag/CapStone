package it.nextdevs.EpicEnergyServices.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class UserDto{

    @Email( regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$" )
    @NotBlank(message = "L'email dell'utente non può essere vuota, mancante o composta da soli spazi")
    private String email;
    @NotBlank(message = "La password non può essere vuota, mancante o composta da soli spazi")
    private String password;
    @NotBlank(message = "Lo username dell'utente non può essere vuoto, mancante o composto da soli spazi")
    private String username;
    @NotBlank(message = "Il nome dell'utente non può essere vuoto, mancante o composto da soli spazi")
    private String nome;
    @NotBlank(message = "Il cognome dell'utente non può essere vuoto, mancante o composto da soli spazi")
    private String cognome;
    private String avatar;


}
