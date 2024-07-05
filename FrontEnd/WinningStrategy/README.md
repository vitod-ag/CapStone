# Winning Strategy

Building per schemi tattici calcistici


## Descrizione
Creare, visualizzare e salvare schemi tattici di calcio in un'interfaccia intuitiva e interattiva, rendendola completamente responsive per un'esperienza ottimale su dispositivi desktop, tablet e mobile.

## Indice
- [Winning Strategy](#winning-strategy)
  - [Descrizione](#descrizione)
  - [Indice](#indice)
  - [Obiettivo dell'Applicazione](#obiettivo-dellapplicazione)
  - [Funzionalità](#funzionalità)
  - [Tecnologie Utilizzate](#tecnologie-utilizzate)
  - [Requisiti di Sistema](#requisiti-di-sistema)
  - [Installazione](#installazione)
    - [Prerequisiti](#prerequisiti)
    - [Clonazione del Repository](#clonazione-del-repository)
    - [Installazione del Frontend](#installazione-del-frontend)
    - [Configurazione del Database](#configurazione-del-database)
  - [Avvio dell'applicazione](#avvio-dellapplicazione)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Utilizzo](#utilizzo)
  - [API Documentation](#api-documentation)
    - [Endpoint Principali](#endpoint-principali)
  - [Calciatore](#calciatore)
  - [Campionato](#campionato)
  - [Salvati](#salvati)
  - [Squadra](#squadra)
  - [User](#user)
  - [Contributing](#contributing)
  - [Test](#test)
    - [Test del Frontend](#test-del-frontend)
    - [Test del Backend](#test-del-backend)
  - [Deployment](#deployment)
  - [Manutenzione](#manutenzione)
  - [Licenza](#licenza)
  - [Contatti](#contatti)
  - [Licenza](#licenza-1)

## Obiettivo dell'Applicazione
L'applicazione mira a fornire uno strumento per chi si sente un allenatore di calcio e vuole creare e gestire i suoi schemi tattici relativi alla squadra che vuole in modo interattivo e visivamente intuitivo.

## Funzionalità
- **Registrazione Utente**: Creazione di account utente.
- **Login Utente**: Accesso tramite email e password.
- **Creazione di Schemi Tattici**: Disegno e modifica di schemi tattici.
- **Salvataggio dei Moduli Tattici**: Salvataggio di schemi tattici predefiniti e personalizzati.
- **Integrazione API**: Accesso a dati aggiornati su partite, giocatori e squadre.

## Tecnologie Utilizzate
- **Frontend**: Angular
    - **Bootstrap**: v5.3.3
    - **@auth0/angular-jwt**: gestione dei token JWT
    - **@abacritt/angularx-social-login**:  integrazione login social
    - **@ng-bootstrap/ng-bootstrap:**: componenti UI Bootstrap per Angular
- **Backend**: Java con Spring Boot
- **Database**: PostgreSQL
- **API**: File JSON creato e popolato internamente

## Requisiti di Sistema
- **Node.js**: v14.x.x
- **Java**: JDK 11+
- **PostgreSQL**: v12.x

## Installazione

### Prerequisiti
- Node.js e npm installati
- Java Development Kit (JDK)
- PostgreSQL installato e configurato

### Clonazione del Repository
```bash
git clone <repository-url>
cd Winning_Strategy
```

### Installazione del Frontend
```bash
cd frontend
npm install
npm install bootstrap@5.3.3
npm install @auth0/angular-jwt
npm install @abacritt/angularx-social-login@2.1.0
ng add @ng-bootstrap/ng-bootstrap
npm run build
```
### Configurazione del Database
1.Creare un database PostgreSQL:
```sql
CREATE DATABASE Winning_Strategy;
```
2.1. Modificare le configurazioni del database nel file application.properties:

    • spring.datasource.url = jdbc:postgresql://localhost:5432/Winning_strategy

    • spring.datasource.username = <your-username>

    • spring.datasource.password = <env.properties-password>

2.2. Modificare le configurazioni del database nel file env.properties:

    • spring.datasource.password = <your-password>

    • cloudinary.name=docxszg9d= <your-cloudinaryName>

    • cloudinary.apikey = <your-cloudinaryApikey>
    
    • cloudinary.secret = <your-cloudinarySecret>

    • gmail.mail.from = <your-email>

    • gmail.mail.from.password = <your-emailPassword>

    • jwt.secret = <your-JwtSecret>

    • client-id = <your-clientId>

    • client-secret = <your-clientSecret>


## Avvio dell'applicazione

### Frontend
```bash
cd frontend
npm start
```
### Backend
```bash
cd backend
./mvnw spring-boot:run
```
## Utilizzo

    1. Registrarsi tramite la pagina di registrazione.
    2. Accedere con le proprie credenziali.
    3. Utilizzare l'interfaccia per creare e modificare schemi tattici.
    4. Salvare i moduli tattici nel proprio profilo utente.

## API Documentation

L'applicazione fornisce un'API per gestire schemi tattici e interagire con i dati dei giocatori e delle squadre. Tutti i dati sono gestiti internamente tramite file JSON creato e popolato internamente.

### Endpoint Principali

## Calciatore 

• `POST /calciatore`: Creazione di un nuovo calciatore (admin).

• `GET /calciatore`:  Recupero di tutti i calciatori (admin, user).

• `GET  /calciatore/{nome}`: Recupero di un calciatore per nome (admin, user).

• `PUT /calciatore/{id}`: Modifica di un calciatore esistente (admin).

• `DELETE /calciatore/{id}`: Modifica di un calciatore esistente (admin).

## Campionato 

• `POST /campionato`: Creazione di un nuovo campionato (admin).

• `GET /campionato`:  Recupero di tutti i campionati (admin, user).

• `GET /campionato/{nome}`: Recupero di un campionato per nome (admin, user).

• `PATCH /campionato/{id}/logo`: Aggiornamento del logo del campionato (admin).

• `PUT /campionato/{id}`: Modifica di un campionato esistente (admin).

• `DELETE /campionato/{id}`: Eliminazione di un campionato (admin).

## Salvati 

• `POST /salvataggio`: Salvataggio di uno schema tattico.

• `GET /salvati`:  Recupero di tutti gli schemi tattici salvati.

• `GET /salvati/{id}`: Recupero di uno schema tattico salvato per ID.

• `DELETE /salvati/{id}`:  Eliminazione di uno schema tattico salvato per ID.

• `DELETE /salvati/utente/{id}`: Eliminazione di tutti gli schemi tattici salvati di un utente.

## Squadra 

• `POST /squadra`: Creazione di una nuova squadra (admin).

• `GET /squadra`:  Recupero di tutte le squadre (admin, user).

• `GET /campionato/{campionatoId}/squadre`: Recupero di tutte le squadre per campionato (admin, user).

• `GET /squadra/{nome}`: Recupero di una squadra per nome (admin, user).

• `PATCH /squadra/{id}/logo`: Aggiornamento del logo della squadra (admin).

• `PUT /squadra/{id}`: Modifica di una squadra esistente (admin).

• `DELETE /squadra/{id}`: Eliminazione di una squadra (admin).

• `GET /squadra/{id}/calciatori`: Recupero di tutti i calciatori di una squadra (admin, user).

• `GET /squadre/{id}/logo`: Recupero del logo di una squadra per ID.

## User 

• `GET /users`: Recupero di tutti gli utenti (admin, user).

• `GET /users/{id}`: Recupero di un utente per ID (admin, user).

• `PUT /users/{id}`: Modifica di un utente esistente (admin, user).

• `PATCH /users/{id}`: Aggiornamento parziale di un utente (admin, user).

• `PATCH /users/{id}/avatar`: Aggiornamento dell'avatar di un utente

• `DELETE /users/{id}`: Eliminazione di un utente (admin).

## Contributing

I contributi sono benvenuti! Per favore segui i seguenti passaggi:

    1. Fork del progetto.
    2. Crea un branch per la tua feature (git checkout -b feature/AmazingFeature).
    3. Fai commit delle tue modifiche (git commit -m 'Add some AmazingFeature').
    4. Push del branch (git push origin feature/AmazingFeature).
    5. Apri una Pull Request.

## Test

### Test del Frontend
```bash
cd frontend
npm test
```
### Test del Backend
```bash
cd backend
./mvnw test
```
## Deployment

    1. Configurare il server con Node.js, JDK e PostgreSQL installati.
    2. Clonare il repository nel server.
    3. Installare le dipendenze del frontend e del backend.
    4. Configurare il database PostgreSQL.
    5. Avviare il frontend e il backend.

## Manutenzione

• Backup del Database: Effettuare backup regolari del database PostgreSQL.

• Aggiornamento delle Dipendenze: Tenere aggiornate le dipendenze del frontend e del backend.

• Monitoraggio dei Log: Monitorare i log per identificare e risolvere eventuali problemi.

## Licenza

Questo progetto è distribuito sotto la licenza MIT. Vedi il file LICENSE per ulteriori dettagli.

## Contatti

Per qualsiasi domanda, per favore contattaci a vito.dagnello@gmail.com

## Licenza

Grazie a tutti i contributori e agli utenti che hanno supportato questo progetto.