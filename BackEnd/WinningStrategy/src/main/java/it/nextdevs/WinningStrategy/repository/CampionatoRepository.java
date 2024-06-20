package it.nextdevs.WinningStrategy.repository;

import it.nextdevs.WinningStrategy.model.Campionato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CampionatoRepository extends JpaRepository<Campionato, Integer> {
    Optional<Campionato> findByNome(String nome);
}
