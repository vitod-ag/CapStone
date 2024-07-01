package it.nextdevs.WinningStrategy.controller;

import it.nextdevs.WinningStrategy.dto.SquadraDto;
import it.nextdevs.WinningStrategy.exception.BadRequestException;
import it.nextdevs.WinningStrategy.model.Calciatore;
import it.nextdevs.WinningStrategy.model.Squadra;
import it.nextdevs.WinningStrategy.service.SquadraService;
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
import java.util.List;

@RestController
public class SquadraController {

    @Autowired
    private SquadraService squadraService;

    @PostMapping("/squadra")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Integer saveSquadra(@RequestBody @Validated SquadraDto squadraDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage()).reduce("", (s, s2) -> s + s2));
        }
        return squadraService.saveSquadra(squadraDto);
    }

    @GetMapping("/squadra")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Page<Squadra> getAllSquadre(@RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "15") int size,
                                       @RequestParam(defaultValue = "id") String sortBy) {
        return squadraService.getAllSquadra(page, size, sortBy);
    }

    @GetMapping("/campionato/{campionatoId}/squadre")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public List<Squadra> getSquadreByCampionato(@PathVariable int campionatoId ) {
        System.out.println(campionatoId);
        return squadraService.getSquadreByCampionato(campionatoId);
    }

    @GetMapping("/squadra/{nome}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public Squadra getSquadraByNome(@PathVariable String nome) {
        return squadraService.getSquadraByNome(nome);
    }

    @PatchMapping(value = "/squadra/{id}/logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ADMIN')")
    public Squadra patchImmagineSquadra(@PathVariable int id, @RequestParam("file") MultipartFile avatar) throws IOException {
        return squadraService.patchImmagineSquadra(id, avatar);
    }

    @PutMapping("/squadra/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Squadra updateSquadra(@PathVariable int id, @RequestBody @Validated SquadraDto squadraDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream().
                    map(DefaultMessageSourceResolvable::getDefaultMessage).reduce("", ((s, s2) -> s + s2)));
        }
        return squadraService.updateSquadra(id, squadraDto);
    }

    @DeleteMapping("/squadra/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteSquadra(@PathVariable int id) {
        return squadraService.deleteSquadra(id);
    }

    @GetMapping("/squadra/{id}/calciatori")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public List<Calciatore> getCalciatoriBySquadraId(@PathVariable int id) {
        return squadraService.getCalciatoriBySquadraId(id);
    }


    @GetMapping("/squadre/{id}/logo")
    public String getLogoBySquadraId(@PathVariable int id) {
        return squadraService.getLogoBySquadraId(id);
    }
}
