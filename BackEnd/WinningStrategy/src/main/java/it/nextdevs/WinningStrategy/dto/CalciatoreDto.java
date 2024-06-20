package it.nextdevs.WinningStrategy.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CalciatoreDto {
    @NotNull
    private String nomeCompleto;
    @NotNull
    private String ruolo;
    @NotNull
    private int numeroMaglia;
    private int squadraId;
}
