package it.nextdevs.WinningStrategy.service;

import it.nextdevs.WinningStrategy.model.Campionato;
import it.nextdevs.WinningStrategy.repository.CampionatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CampionatoService {

    @Autowired
    private CampionatoRepository campionatoRepository;

    public List<Campionato> getAllCampionati() {
        return campionatoRepository.findAll();
    }

    public Campionato getCampionatoById(int id) {
        return campionatoRepository.findById(id).orElse(null);
    }

    public Campionato saveCampionato(Campionato campionato) {
        return campionatoRepository.save(campionato);
    }

    public void deleteCampionato(int id) {
        campionatoRepository.deleteById(id);
    }
}
