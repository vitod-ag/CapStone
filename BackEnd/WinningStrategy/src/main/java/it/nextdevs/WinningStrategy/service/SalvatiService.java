package it.nextdevs.WinningStrategy.service;

import it.nextdevs.WinningStrategy.dto.SalvatiDto;
import it.nextdevs.WinningStrategy.exception.NotFoundException;
import it.nextdevs.WinningStrategy.model.Campionato;
import it.nextdevs.WinningStrategy.model.GiocatoriPosizionati;
import it.nextdevs.WinningStrategy.model.Salvati;
import it.nextdevs.WinningStrategy.model.Squadra;
import it.nextdevs.WinningStrategy.repository.*;
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
    private UserRepository userRepository;

    @Autowired
    private GiocatorePosizionatoService giocatorePosizionatoService;

    @Autowired
    private GiocatorePosizionatoRepository giocatorePosizionatoRepository;

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
                salvati.setNoteTattiche(salvatiDto.getNoteTattiche());
                if (userRepository.findById(salvatiDto.getUserId()).isPresent()) {
                    salvati.setUser(userRepository.findById(salvatiDto.getUserId()).get());
                }
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

    public Optional<Salvati> getSalvatiById(int id) {
        return salvatiRepository.findById(id);
    }

    public String deleteSalvatoById(int id) {
        Optional<Salvati> salvatiOptional = salvatiRepository.findById(id);
        if (salvatiOptional.isPresent()) {
            List<GiocatoriPosizionati> giocatoriPosizionatiList = salvatiOptional.get().getGiocatoriPosizionatiList();
            giocatoriPosizionatiList.forEach(giocatoriPosizionati -> {
                giocatorePosizionatoRepository.delete(giocatoriPosizionati);
            });
            salvatiRepository.delete(salvatiOptional.get());
            return "Salvato con id " + id + " eliminato con successo";
        } else {
            throw new NotFoundException("Il salvato con id: " + id + " non è presente");
        }
    }

    public String deleteAllSalvati(int userId) {
        List<Salvati> salvatiList = salvatiRepository.findAllByUser_IdUtente(userId);
        if (!salvatiList.isEmpty()) {
            salvatiList.forEach(salvati -> {
                List<GiocatoriPosizionati> giocatoriPosizionatiList = salvati.getGiocatoriPosizionatiList();
                giocatoriPosizionatiList.forEach(giocatoriPosizionati -> {
                    giocatorePosizionatoRepository.delete(giocatoriPosizionati);
                });
                salvatiRepository.delete(salvati);
            });
            return "Tutti i salvati dell'utente con id " + userId + " sono stati eliminati con successo";
        } else {
            throw new NotFoundException("Non ci sono salvati per l'utente con id: " + userId);
        }
    }

}
