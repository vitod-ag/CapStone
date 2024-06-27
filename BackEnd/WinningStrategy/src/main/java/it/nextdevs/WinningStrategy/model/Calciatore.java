package it.nextdevs.WinningStrategy.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
//Un Calciatore appartiene a una Squadra
public class Calciatore {
    @Id
    @GeneratedValue
    private int id;
    private String nomeCompleto;
    private String ruolo;
    private int numeroMaglia;

    @ManyToOne
    @JoinColumn(name = "squadra_id")
    private Squadra squadra;

    @OneToMany(mappedBy = "calciatore")
    @JsonIgnore
    private List<GiocatoriPosizionati> giocatoriPosizionatiList;

}
