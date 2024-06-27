package it.nextdevs.WinningStrategy.controller;

import it.nextdevs.WinningStrategy.dto.SalvatiDto;
import it.nextdevs.WinningStrategy.exception.BadRequestException;
import it.nextdevs.WinningStrategy.model.Salvati;
import it.nextdevs.WinningStrategy.service.SalvatiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    public List<Salvati> getAll() {
        return salvatiService.getAllSalvati();
    }

}
