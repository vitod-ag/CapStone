package it.nextdevs.WinningStrategy.repository;

import it.nextdevs.WinningStrategy.model.Calciatore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CalciatoreRepository extends JpaRepository<Calciatore, Integer> {
    Optional<Calciatore> findByNomeCompleto(String nome);
}
