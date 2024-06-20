package it.nextdevs.WinningStrategy.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CampionatoDto {
    @NotNull
    private String nome;
    @NotNull
    private String logo;
}
