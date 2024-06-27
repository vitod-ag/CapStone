package it.nextdevs.WinningStrategy.service;

import it.nextdevs.WinningStrategy.dto.SalvatiDto;
import it.nextdevs.WinningStrategy.exception.NotFoundException;
import it.nextdevs.WinningStrategy.model.Campionato;
import it.nextdevs.WinningStrategy.model.GiocatoriPosizionati;
import it.nextdevs.WinningStrategy.model.Salvati;
import it.nextdevs.WinningStrategy.model.Squadra;
import it.nextdevs.WinningStrategy.repository.CampionatoRepository;
import it.nextdevs.WinningStrategy.repository.SalvatiRepository;
import it.nextdevs.WinningStrategy.repository.SquadraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SalvatiService {

    @Autowired
    private SalvatiRepository salvatiRepository;

    @Autowired
    private CampionatoRepository campionatoRepository;

    @Autowired
    private SquadraRepository squadraRepository;

    @Autowired
    private GiocatorePosizionatoService giocatorePosizionatoService;

    public Integer saveSalvati(SalvatiDto salvatiDto) {
        Optional<Campionato> campionatoOptional = campionatoRepository.findById(salvatiDto.getCampionatoId());
        if (campionatoOptional.isPresent()) {
            Campionato campionato = campionatoOptional.get();
            Optional<Squadra> squadraOptional = squadraRepository.findById(salvatiDto.getSquadraId());
            if (squadraOptional.isPresent()) {
                Squadra squadra = squadraOptional.get();
                Salvati salvati = new Salvati();
                salvati.setCampionato(campionato);
                salvati.setSquadra(squadra);
                salvati.setColore(salvatiDto.getColore());
                salvati.setModulo(salvatiDto.getModulo());
                List<GiocatoriPosizionati> giocatoriPosizionatiList = new ArrayList<>();
                salvatiDto.getGiocatoriPosizionati().forEach(giocatore -> {
                    Integer id = giocatorePosizionatoService.saveGiocatorePosizionato(giocatore);
                    Optional<GiocatoriPosizionati> giocatoriPosizionatiOptional = giocatorePosizionatoService.getGiocatorePosizionatoById(id);
                    if (giocatoriPosizionatiOptional.isPresent()) {
                        giocatoriPosizionatiList.add(giocatoriPosizionatiOptional.get());
                    } else {
                        throw new NotFoundException("Giocatore posizionato non trovato");
                    }
                });
                salvati.setGiocatoriPosizionatiList(giocatoriPosizionatiList);
                salvatiRepository.save(salvati);
                salvati.getGiocatoriPosizionatiList().forEach(giocatoriPosizionati -> {
                    giocatoriPosizionati.setSalvati(salvati);
                    giocatorePosizionatoService.updateGiocatoreSalvataggio(giocatoriPosizionati);
                });
                return salvati.getId();
            } else {
                throw new NotFoundException("La squadra con id: " + salvatiDto.getSquadraId() + " non è presente");
            }
        }else {
            throw new NotFoundException("Il campionato con id: " + salvatiDto.getCampionatoId() + " non è presente");
        }
    }

    public List<Salvati> getAllSalvati() {
        return salvatiRepository.findAll();
    }
}
