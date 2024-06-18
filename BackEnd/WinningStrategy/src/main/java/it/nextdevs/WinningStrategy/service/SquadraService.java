package it.nextdevs.WinningStrategy.service;

import it.nextdevs.WinningStrategy.model.Campionato;
import it.nextdevs.WinningStrategy.model.Squadra;
import it.nextdevs.WinningStrategy.repository.SquadraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SquadraService {

    @Autowired
    private SquadraRepository squadraRepository;


    public List<Squadra> getAllSquadre() {
        return squadraRepository.findAll();
    }

    public Squadra getSquadraById(int id) {
        return squadraRepository.findById(id).orElse(null);
    }

    public Squadra saveSquadra(Squadra squadra) {
        return squadraRepository.save(squadra);
    }

    public void deleteSquadra(int id) {
        squadraRepository.deleteById(id);
    }
}
