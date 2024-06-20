package it.nextdevs.WinningStrategy.service;

import com.cloudinary.Cloudinary;
import it.nextdevs.WinningStrategy.dto.CampionatoDto;
import it.nextdevs.WinningStrategy.dto.SquadraDto;
import it.nextdevs.WinningStrategy.exception.NotFoundException;
import it.nextdevs.WinningStrategy.model.Campionato;
import it.nextdevs.WinningStrategy.model.Squadra;
import it.nextdevs.WinningStrategy.repository.SquadraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Service
public class SquadraService {

    @Autowired
    private SquadraRepository squadraRepository;

    @Autowired
    private Cloudinary cloudinary;


    public Integer saveSquadra(SquadraDto squadraDto) {
        Squadra squadra = new Squadra();
        squadra.setNome(squadraDto.getNome());
        squadraRepository.save(squadra);
        return squadra.getId();
    }

    public Optional<Squadra> getSquadraById(int id) {
        return squadraRepository.findById(id);
    }

    public Squadra getSquadraByNome(String nome) {
        Optional<Squadra> squadraOptional = squadraRepository.findByNome(nome);
        if (squadraOptional.isPresent()) {
            return squadraOptional.get();
        } else {
            throw new NotFoundException("Squadra con nome " + nome + " non esiste");
        }
    }

    public Page<Squadra> getAllSquadra(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        //controllare che l'import di Sort.by sia corretto
        return squadraRepository.findAll(pageable);
    }

    public Squadra updateSquadra(int id, SquadraDto squadraDto) {
        Optional<Squadra> squadraOptional = getSquadraById(id);
        if (squadraOptional.isPresent()) {
            Squadra squadra = squadraOptional.get();
            squadra.setNome(squadraDto.getNome());
            return squadraRepository.save(squadra);
        }
        throw new NotFoundException("La squadra con id: " + id + " non è presente");
    }

    public Squadra patchImmagineSquadra(Integer id, MultipartFile avatar) throws IOException {
        Optional<Squadra> squadraOptional = getSquadraById(id);

        if (squadraOptional.isPresent()) {
            String url = (String) cloudinary.uploader().upload(avatar.getBytes(), Collections.emptyMap()).get("url");
            Squadra squadra = squadraOptional.get();
            squadra.setLogo(url);
            squadraRepository.save(squadra);
            return squadra;
        } else {
            throw new NotFoundException("Squadra con id " + id + " non trovato");
        }
    }

    public String deleteSquadra(int id) throws NotFoundException {
        Optional<Squadra> squadraOptional = getSquadraById(id);
        if (squadraOptional.isPresent()) {
            Squadra squadra = squadraOptional.get();
            squadraRepository.delete(squadra);
            return "La squadra con id: " + id + " non è presente";
        } else {
            throw new NotFoundException("La squadra con id: " + id + " non è presente");
        }
    }
}
