package it.nextdevs.WinningStrategy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.nextdevs.WinningStrategy.dto.CalciatoreDto;
import it.nextdevs.WinningStrategy.dto.CampionatoDto;
import it.nextdevs.WinningStrategy.dto.SquadraDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class DataImportService {

    @Autowired
    private CampionatoService campionatoService;

    @Autowired
    private SquadraService squadraService;

    @Autowired
    private CalciatoreService calciatoreService;

    public void importData(String filePath) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(new File(filePath));
        JsonNode campionatiNode = rootNode.path("campionati");

        for (JsonNode campionatoNode : campionatiNode) {
            CampionatoDto campionatoDto = new CampionatoDto();
            campionatoDto.setNome(campionatoNode.path("nome").asText());
            campionatoDto.setLogo(campionatoNode.path("logo").asText());

            Integer campionatoId = campionatoService.saveCampionato(campionatoDto);

            JsonNode squadreNode = campionatoNode.path("squadre");
            for (JsonNode squadraNode : squadreNode) {
                SquadraDto squadraDto = new SquadraDto();
                squadraDto.setNome(squadraNode.path("nome").asText());
                squadraDto.setLogo(squadraNode.path("logo").asText());
                squadraDto.setCampionatoId(campionatoId);

                Integer squadraId = squadraService.saveSquadra(squadraDto);

                JsonNode calciatoriNode = squadraNode.path("calciatori");
                for (JsonNode calciatoreNode : calciatoriNode) {
                    CalciatoreDto calciatoreDto = new CalciatoreDto();
                    calciatoreDto.setNomeCompleto(calciatoreNode.path("nomeCompleto").asText());
                    calciatoreDto.setRuolo(calciatoreNode.path("ruolo").asText());
                    calciatoreDto.setNumeroMaglia(calciatoreNode.path("numeroMaglia").asInt());
                    calciatoreDto.setSquadraId(squadraId);

                    calciatoreService.saveCalciatore(calciatoreDto);
                }
            }
        }
    }
}
