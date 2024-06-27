package it.nextdevs.WinningStrategy.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Salvati {

    @Id
    @GeneratedValue
    private int id;
    private String colore;
    private String modulo;

    @ManyToOne
    @JoinColumn(name = "campionato_id")
    private Campionato campionato;

    @ManyToOne
    @JoinColumn(name = "squadra_id")
    private Squadra squadra;

    @OneToMany(mappedBy = "salvati")
    private List<GiocatoriPosizionati> giocatoriPosizionatiList;


}
