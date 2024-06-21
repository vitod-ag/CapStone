package it.nextdevs.WinningStrategy.service;

import com.cloudinary.Cloudinary;
import it.nextdevs.WinningStrategy.dto.CampionatoDto;
import it.nextdevs.WinningStrategy.exception.NotFoundException;
import it.nextdevs.WinningStrategy.model.Campionato;
import it.nextdevs.WinningStrategy.repository.CampionatoRepository;
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
public class CampionatoService {

    @Autowired
    private CampionatoRepository campionatoRepository;

    @Autowired
    private Cloudinary cloudinary;


    public Integer saveCampionato(CampionatoDto campionatoDto) {
        Campionato campionato = new Campionato();
        campionato.setNome(campionatoDto.getNome());
        campionatoRepository.save(campionato);
        return campionato.getId();
    }

    public Optional<Campionato> getCampionatoById(int id) {
         return campionatoRepository.findById(id);
    }



    public Page<Campionato> getAllCampionati(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        //controllare che l'import di Sort.by sia corretto
        return campionatoRepository.findAll(pageable);
    }

    public Campionato getCampionatoByNome(String nome) {
        Optional<Campionato> campionatoOptional = campionatoRepository.findByNome(nome);
        if (campionatoOptional.isPresent()) {
            return campionatoOptional.get();
        } else {
            throw new NotFoundException("Campionato con nome " + nome + " non esiste");
        }
    }

    public Campionato updateCampionato(int id, CampionatoDto campionatoDto) {
        Optional<Campionato> campionatoOptional = getCampionatoById(id);
        if (campionatoOptional.isPresent()) {
            Campionato campionato = campionatoOptional.get();
            campionato.setNome(campionatoDto.getNome());
            return campionatoRepository.save(campionato);
        }
        throw new NotFoundException("Il campionato con id: " + id + " non è presente");
    }

    public Campionato patchImmagineCampionato(Integer id, MultipartFile avatar) throws IOException {
        Optional<Campionato> campionatoOptional = getCampionatoById(id);

        if (campionatoOptional.isPresent()) {
            String url = (String) cloudinary.uploader().upload(avatar.getBytes(), Collections.emptyMap()).get("url");
            Campionato campionato = campionatoOptional.get();
            campionato.setLogo(url);
            campionatoRepository.save(campionato);
            return campionato;
        } else {
            throw new NotFoundException("Il campionato con id " + id + " non trovato");
        }
    }

    public String deleteCampionato(int id) throws NotFoundException {
        Optional<Campionato> campionatoOptional = getCampionatoById(id);
        if (campionatoOptional.isPresent()) {
            Campionato campionato = campionatoOptional.get();
            campionatoRepository.delete(campionato);
            return "Il campionato con id: " + id + " non è presente";
        } else {
            throw new NotFoundException("Il campionato con id: " + id + " non è presente");
        }
    }
}
