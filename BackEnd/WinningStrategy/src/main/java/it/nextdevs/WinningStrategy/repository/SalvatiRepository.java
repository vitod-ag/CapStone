package it.nextdevs.WinningStrategy.repository;

import it.nextdevs.WinningStrategy.model.Salvati;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SalvatiRepository extends JpaRepository<Salvati,Integer> {
   List<Salvati> findAllByUser_IdUtente(int id);
}
