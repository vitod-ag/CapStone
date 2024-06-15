package it.nextdevs.WinningStrategy.dto;

import it.nextdevs.WinningStrategy.enums.TipoUtente;
import lombok.Data;

@Data
public class UserDataDto {
    private int idUtente;
    private String email;
    private String username;
    private String nome;
    private String cognome;
    private TipoUtente tipoUtente;
    private String avatar;
}
