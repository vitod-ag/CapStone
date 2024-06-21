package it.nextdevs.WinningStrategy.controller;

import it.nextdevs.WinningStrategy.dto.CampionatoDto;
import it.nextdevs.WinningStrategy.exception.BadRequestException;
import it.nextdevs.WinningStrategy.model.Campionato;
import it.nextdevs.WinningStrategy.service.CampionatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class CampionatoController {

    @Autowired
    private CampionatoService campionatoService;

    @PostMapping("/campionato")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Integer saveCampionato(@RequestBody @Validated CampionatoDto campionatoDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage()).reduce("", (s, s2) -> s + s2));
        }
        return campionatoService.saveCampionato(campionatoDto);
    }

    @GetMapping("/campionato")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Page<Campionato> getAllCampionati(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "15") int size,
                                             @RequestParam(defaultValue = "id") String sortBy) {
        return campionatoService.getAllCampionati(page, size, sortBy);
    }

    @GetMapping("/campionato/{nome}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public Campionato getCampionatoByNome(@PathVariable String nome) {
        return campionatoService.getCampionatoByNome(nome);
    }

    @PatchMapping(value = "/campionato/{id}/logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ADMIN')")
    public Campionato patchImmagineCampionato(@PathVariable int id, @RequestParam("file") MultipartFile avatar) throws IOException {
        return campionatoService.patchImmagineCampionato(id, avatar);
    }

    @PutMapping("/campionato/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Campionato updateCampionato(@PathVariable int id, @RequestBody @Validated CampionatoDto campionatoDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream().
                    map(DefaultMessageSourceResolvable::getDefaultMessage).reduce("", ((s, s2) -> s + s2)));
        }
        return campionatoService.updateCampionato(id, campionatoDto);
    }

    @DeleteMapping("/campionato/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteCampionato(@PathVariable int id) {
        return campionatoService.deleteCampionato(id);
    }
}
