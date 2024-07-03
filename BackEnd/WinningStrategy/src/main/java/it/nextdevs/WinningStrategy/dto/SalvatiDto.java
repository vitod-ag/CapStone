package it.nextdevs.WinningStrategy.dto;

import it.nextdevs.WinningStrategy.model.GiocatoriPosizionati;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class SalvatiDto {

    @NotNull
    private int campionatoId;
    @NotNull
    private int squadraId;
    @NotNull
    private int userId;
    @NotNull
    private String colore;
    @NotNull
    private String modulo;
    @NotNull
    private String noteTattiche;
    @NotNull
    private List<GiocatorePosizionatoDto> giocatoriPosizionati;
}
