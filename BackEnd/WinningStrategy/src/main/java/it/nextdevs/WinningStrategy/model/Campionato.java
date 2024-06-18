package it.nextdevs.WinningStrategy.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
//Un Campionato ha molte Squadre
public class Campionato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;

    @OneToMany(mappedBy = "campionato")
    private List<Squadra> squadre;
}
