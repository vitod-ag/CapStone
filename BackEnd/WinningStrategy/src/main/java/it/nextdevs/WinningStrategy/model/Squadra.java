package it.nextdevs.WinningStrategy.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
//Diverse Squadre appartiene a un Campionato
//Una Squadra ha molti Calciatori
public class Squadra {
    @Id
    @GeneratedValue
    private int id;
    private String nome;
    private String logo;

    @ManyToOne
    @JoinColumn(name = "campionato_id")
    private Campionato campionati;

    @OneToMany(mappedBy = "squadra")
    @JsonIgnore
    private List<Calciatore> calciatori;
}
