package it.nextdevs.WinningStrategy.controller;


import it.nextdevs.WinningStrategy.dto.CalciatoreDto;
import it.nextdevs.WinningStrategy.exception.BadRequestException;
import it.nextdevs.WinningStrategy.model.Calciatore;
import it.nextdevs.WinningStrategy.service.CalciatoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
public class CalciatoreController {

    @Autowired
    private CalciatoreService calciatoreService;

    @PostMapping("/calciatore")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Integer saveCalciatore(@RequestBody @Validated CalciatoreDto calciatoreDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage()).reduce("", (s, s2) -> s + s2));
        }
        return calciatoreService.saveCalciatore(calciatoreDto);
    }

    @GetMapping("/calciatore")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Page<Calciatore> getAllCalciatore(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "15") int size,
                                          @RequestParam(defaultValue = "id") String sortBy) {
        return calciatoreService.getAllCalciatore(page, size, sortBy);
    }

    @GetMapping("/calciatore/{nome}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public Calciatore getCalciatoreByNome(@PathVariable String nome) {
        return calciatoreService.getCalciatoreByNome(nome);
    }

    @PutMapping("/calciatore/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Calciatore updateCalciatore(@PathVariable int id, @RequestBody @Validated CalciatoreDto calciatoreDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream().
                    map(DefaultMessageSourceResolvable::getDefaultMessage).reduce("", ((s, s2) -> s + s2)));
        }
        return calciatoreService.updateCalciatore(id, calciatoreDto);
    }

    @DeleteMapping("/calciatore/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteCalciatore(@PathVariable int id) {
        return calciatoreService.deleteCalciatore(id);
    }
}
