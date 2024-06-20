package it.nextdevs.WinningStrategy.repository;

import it.nextdevs.WinningStrategy.model.Squadra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SquadraRepository extends JpaRepository<Squadra, Integer> {

    Optional<Squadra> findByNome(String nome);
}
