package it.nextdevs.WinningStrategy.controller;

import it.nextdevs.WinningStrategy.dto.SalvatiDto;
import it.nextdevs.WinningStrategy.exception.BadRequestException;
import it.nextdevs.WinningStrategy.model.Salvati;
import it.nextdevs.WinningStrategy.service.SalvatiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SalvatiController {
    @Autowired
    private SalvatiService salvatiService;
    @PostMapping("/salvataggio")
    public Integer saveSalvataggio(@RequestBody @Validated SalvatiDto salvatiDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors().stream()
                    .map(e -> e.getDefaultMessage()).reduce("",((s1,s2) -> s1+s2)));
        }
        return salvatiService.saveSalvati(salvatiDto);
    }

    @GetMapping("/salvati")
    public List<Salvati> getAllSalvati() {
        return salvatiService.getAllSalvati();
    }

    @GetMapping("/salvati/{id}")
    public Salvati getSalvatiById(@PathVariable int id) {
        return salvatiService.getSalvatiById(id).orElse(null);
    }

    @DeleteMapping("/salvati/{id}")
    public String deleteSalvatoById(@PathVariable int id) {
        salvatiService.deleteSalvatoById(id);
        return "Salvato eliminato con successo";
    }

    @DeleteMapping("salvati/utente/{id}")
    public void deleteAllSalvati(@PathVariable int id) {
        salvatiService.deleteAllSalvati(id);
    }

}
