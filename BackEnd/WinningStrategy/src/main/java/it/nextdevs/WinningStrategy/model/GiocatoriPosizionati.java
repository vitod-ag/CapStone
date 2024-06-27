package it.nextdevs.WinningStrategy.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class GiocatoriPosizionati {
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    @JoinColumn(name = "calciatore_id")
    private Calciatore calciatore;
    private String x;
    private String y;

    @ManyToOne
    @JoinColumn(name = "salvati_id")
    @JsonIgnore
    private Salvati salvati;
}
