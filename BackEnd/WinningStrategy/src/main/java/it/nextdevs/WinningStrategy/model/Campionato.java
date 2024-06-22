package it.nextdevs.WinningStrategy.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
//Un Campionato ha molte Squadre
public class Campionato {
    @Id
    @GeneratedValue
    private int id;
    private String nome;
    private String logo;

    @OneToMany(mappedBy = "campionati")
    @JsonIgnore
    private List<Squadra> squadre;
}
