package it.nextdevs.WinningStrategy.service;

import it.nextdevs.WinningStrategy.model.Calciatore;
import it.nextdevs.WinningStrategy.repository.CalciatoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalciatoreService {

    @Autowired
    private CalciatoreRepository calciatoreRepository;

    public List<Calciatore> getAllCalciatori() {
        return calciatoreRepository.findAll();
    }

    public Calciatore getCalciatoreById(int id) {
        return calciatoreRepository.findById(id).orElse(null);
    }

    public Calciatore saveCalciatore(Calciatore calciatore) {
        return calciatoreRepository.save(calciatore);
    }

    public void deleteCalciatore(int id) {
        calciatoreRepository.deleteById(id);
    }
}
