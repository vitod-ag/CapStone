package it.nextdevs.WinningStrategy.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GiocatorePosizionatoDto {

    @NotNull
    private int calciatoreId;
    @NotNull
    private String x;
    @NotNull
    private String y;
}
