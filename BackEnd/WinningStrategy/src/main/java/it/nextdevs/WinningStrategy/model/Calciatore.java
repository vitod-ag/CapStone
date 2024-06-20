package it.nextdevs.WinningStrategy.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
//Un Calciatore appartiene a una Squadra
public class Calciatore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nomeCompleto;
    private String ruolo;
    private int numeroMaglia;

    @ManyToOne
    @JoinColumn(name = "squadra_id")
    private Squadra squadra;
}
