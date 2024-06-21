package it.nextdevs.WinningStrategy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataImporter implements CommandLineRunner {
    @Autowired
    private DataImportService dataImportService;

    @Override
    public void run(String... args) throws Exception {
        // Path del tuo file JSON nella cartella "data"
        String jsonFilePath = "src/main/resources/data/file.json";
        dataImportService.importData(jsonFilePath);
    }
}
