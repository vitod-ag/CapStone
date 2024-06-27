package it.nextdevs.WinningStrategy.service;

import it.nextdevs.WinningStrategy.dto.GiocatorePosizionatoDto;
import it.nextdevs.WinningStrategy.exception.NotFoundException;
import it.nextdevs.WinningStrategy.model.Calciatore;
import it.nextdevs.WinningStrategy.model.GiocatoriPosizionati;
import it.nextdevs.WinningStrategy.repository.CalciatoreRepository;
import it.nextdevs.WinningStrategy.repository.GiocatorePosizionatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GiocatorePosizionatoService {

    @Autowired
    private GiocatorePosizionatoRepository giocatorePosizionatoRepository;
    @Autowired
    private CalciatoreRepository calciatoreRepository;

    public Integer saveGiocatorePosizionato(GiocatorePosizionatoDto giocatorePosizionatoDto) {
        Optional<Calciatore> calciatoreOptional = calciatoreRepository.findById(giocatorePosizionatoDto.getCalciatoreId());
        if (calciatoreOptional.isPresent()) {
            Calciatore calciatore = calciatoreOptional.get();
            GiocatoriPosizionati giocatorePosizionato = new GiocatoriPosizionati();
            giocatorePosizionato.setCalciatore(calciatore);
            giocatorePosizionato.setX(giocatorePosizionatoDto.getX());
            giocatorePosizionato.setY(giocatorePosizionatoDto.getY());
            return giocatorePosizionatoRepository.save(giocatorePosizionato).getId();
        }else {
            throw new NotFoundException("Il calciatore con id: " + giocatorePosizionatoDto.getCalciatoreId() + " non è presente");
        }
    }

    public List<GiocatoriPosizionati> getAllGiocatoriPosizionati() {
        return giocatorePosizionatoRepository.findAll();
    }

    public Optional<GiocatoriPosizionati> getGiocatorePosizionatoById(Integer id) {
        return giocatorePosizionatoRepository.findById(id);
    }

    public void updateGiocatoreSalvataggio(GiocatoriPosizionati giocatoriPosizionati) {
        giocatorePosizionatoRepository.save(giocatoriPosizionati);
    }
}
