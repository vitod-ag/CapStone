package it.nextdevs.WinningStrategy.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SquadraDto {
    @NotNull
    private String nome;
    @NotNull
    private String logo;
    private int campionatoId;
}
