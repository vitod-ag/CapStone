package it.nextdevs.WinningStrategy.service;

import it.nextdevs.WinningStrategy.dto.CalciatoreDto;
import it.nextdevs.WinningStrategy.exception.NotFoundException;
import it.nextdevs.WinningStrategy.model.Calciatore;
import it.nextdevs.WinningStrategy.model.Squadra;
import it.nextdevs.WinningStrategy.repository.CalciatoreRepository;
import it.nextdevs.WinningStrategy.repository.SquadraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CalciatoreService {

    @Autowired
    private CalciatoreRepository calciatoreRepository;

    @Autowired
    private SquadraRepository squadraRepository;

    public Integer saveCalciatore(CalciatoreDto calciatoreDto) {
        Calciatore calciatore = new Calciatore();
        calciatore.setNomeCompleto(calciatoreDto.getNomeCompleto());
        calciatore.setRuolo(calciatoreDto.getRuolo());
        calciatore.setNumeroMaglia(calciatoreDto.getNumeroMaglia());
        Optional<Squadra> squadraOptional = squadraRepository.findById(calciatoreDto.getSquadraId());
        squadraOptional.ifPresent(calciatore::setSquadra);
        calciatoreRepository.save(calciatore);
        return calciatore.getId();
    }

    public Optional<Calciatore> getCalciatoreById(int id) {
        return calciatoreRepository.findById(id);
    }

    public Page<Calciatore> getAllCalciatore(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        //controllare che l'import di Sort.by sia corretto
        return calciatoreRepository.findAll(pageable);
    }

    public Calciatore getCalciatoreByNome(String nome) {
        Optional<Calciatore> calciatoreOptional = calciatoreRepository.findByNomeCompleto(nome);
        if (calciatoreOptional.isPresent()) {
            return calciatoreOptional.get();
        } else {
            throw new NotFoundException("Calciatore con nome " + nome + " non esiste");
        }
    }

    public Calciatore updateCalciatore(int id, CalciatoreDto calciatoreDto) {
        Optional<Calciatore> calciatoreOptional = getCalciatoreById(id);
        if (calciatoreOptional.isPresent()) {
            Calciatore calciatore = calciatoreOptional.get();
            calciatore.setNomeCompleto(calciatoreDto.getNomeCompleto());
            calciatore.setRuolo(calciatoreDto.getRuolo());
            calciatore.setNumeroMaglia(calciatoreDto.getNumeroMaglia());
            return calciatoreRepository.save(calciatore);
        }
        throw new NotFoundException("Il calciatore con id: " + id + " non è presente");
    }

    public String deleteCalciatore(int id) throws NotFoundException {
        Optional<Calciatore> calciatoreOptional = getCalciatoreById(id);
        if (calciatoreOptional.isPresent()) {
            Calciatore calciatore = calciatoreOptional.get();
            calciatoreRepository.delete(calciatore);
            return "Il calciatore con id: " + id + " non è presente";
        } else {
            throw new NotFoundException("Il calciatore con id: " + id + " non è presente");
        }
    }
}
