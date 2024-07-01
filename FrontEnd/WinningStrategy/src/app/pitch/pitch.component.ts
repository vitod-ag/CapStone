import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalciatoreService } from '../service/calciatore.service';
import { Calciatore } from '../interface/calciatore.interface';
import { SalvatiService } from '../service/salvati.service';
import { SquadraService } from '../service/squadra.service';

@Component({
    selector: 'app-pitch',
    templateUrl: './pitch.component.html',
    styleUrls: ['./pitch.component.scss'],
})
export class PitchComponent implements OnInit, OnChanges {
    players: any[] = [];
    panchinaPlayers: Calciatore[] = [];
    goalkeepers: Calciatore[] = [];
    defenders: Calciatore[] = [];
    midfielders: Calciatore[] = [];
    forwards: Calciatore[] = [];
    selectedColor = 'blue';
    selectedPlayer: any = {};
    tacticalNotes = '';
    defaultModule = '';
    previousPositions: any = null;
    lastMovedPlayer: any = null;
    isLoading = false; 

    selectedGoalkeeper = '';
    selectedDefender = '';
    selectedMidfielder = '';
    selectedForward = '';
    selectedSquadra = null;
    selectedCampionato = null;
    selectedLogo? = '';

    constructor(
        private route: ActivatedRoute,
        private calciatoreSrv: CalciatoreService,
        private router: Router,
        private salvatiSrv: SalvatiService,
        private squadraSrv: SquadraService
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.selectedSquadra = params['squadraId'];
            this.selectedCampionato = params['campionatoId'];
            if (this.selectedSquadra) {
                this.calciatoreSrv
                    .getCalciatoriBySquadreId(this.selectedSquadra)
                    .subscribe(async(data) => {
                        this.panchinaPlayers = data;
                        this.selectedLogo = await this.squadraSrv.getLogoById(Number(this.selectedSquadra)).toPromise(); 
                        this.filterPlayersByRole();
                    });
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedColor']) {
            this.updatePlayerColors();
        }
    }

    filterPlayersByRole() {
        this.goalkeepers = this.panchinaPlayers.filter(
            (p) => p.ruolo === 'Portiere'
        );
        this.defenders = this.panchinaPlayers.filter(
            (p) => p.ruolo === 'Difensore'
        );
        this.midfielders = this.panchinaPlayers.filter(
            (p) => p.ruolo === 'Centrocampista'
        );
        this.forwards = this.panchinaPlayers.filter(
            (p) => p.ruolo === 'Attaccante'
        );
    }

    onDragStart(event: DragEvent, player: any) {
        event.dataTransfer?.setData('text/plain', JSON.stringify(player));
        this.selectedPlayer = player;
        this.saveCurrentPosition(player);
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        const data = event.dataTransfer?.getData('text/plain');
        if (data) {
            const player = JSON.parse(data);
            const target = event.target as HTMLElement;
            const dropX = (event.offsetX / target.clientWidth) * 100;
            const dropY = (event.offsetY / target.clientHeight) * 100;

            const targetPlayerIndex = this.players.findIndex(
                (p) => p.id === player.id
            );
            if (targetPlayerIndex !== -1) {
                this.players[targetPlayerIndex].x = dropX;
                this.players[targetPlayerIndex].y = dropY;
                this.lastMovedPlayer = this.players[targetPlayerIndex];
            }
        }
    }

    onModuleChange(event: any) {
        const module = event.target.value;
        this.setPlayersForModule(module);
    }

    setPlayersForModule(module: string) {
        this.players = [];
        switch (module) {
            case '4-3-3':
                this.players = this.createInitialPlayersFor433();
                break;
            case '4-4-2':
                this.players = this.createInitialPlayersFor442();
                break;
            case '5-4-1':
                this.players = this.createInitialPlayersFor541();
                break;
            case '3-5-2':
                this.players = this.createInitialPlayersFor352();
                break;
            case '5-3-2':
                this.players = this.createInitialPlayersFor532();
                break;
            default:
                this.players = [];
                break;
        }
    }

    createInitialPlayersFor433() {
        return [
            { ruolo: 'Portiere', x: 9, y: 45, color: this.selectedColor },
            { ruolo: 'Difensore', x: 25, y: 14, color: this.selectedColor },
            { ruolo: 'Difensore', x: 23, y: 35, color: this.selectedColor },
            { ruolo: 'Difensore', x: 23, y: 55, color: this.selectedColor },
            { ruolo: 'Difensore', x: 25, y: 75, color: this.selectedColor },
            {
                ruolo: 'Centrocampista',
                x: 50,
                y: 28,
                color: this.selectedColor,
            },
            {
                ruolo: 'Centrocampista',
                x: 42,
                y: 45,
                color: this.selectedColor,
            },
            {
                ruolo: 'Centrocampista',
                x: 50,
                y: 61,
                color: this.selectedColor,
            },
            { ruolo: 'Attaccante', x: 80, y: 20, color: this.selectedColor },
            { ruolo: 'Attaccante', x: 75, y: 45, color: this.selectedColor },
            { ruolo: 'Attaccante', x: 80, y: 70, color: this.selectedColor },
        ];
    }

    createInitialPlayersFor442() {
        return [
            { ruolo: 'Portiere', x: 9, y: 45, color: this.selectedColor },
            { ruolo: 'Difensore', x: 25, y: 14, color: this.selectedColor },
            { ruolo: 'Difensore', x: 23, y: 35, color: this.selectedColor },
            { ruolo: 'Difensore', x: 23, y: 55, color: this.selectedColor },
            { ruolo: 'Difensore', x: 25, y: 75, color: this.selectedColor },
            {
                ruolo: 'Centrocampista',
                x: 50,
                y: 14,
                color: this.selectedColor,
            },
            {
                ruolo: 'Centrocampista',
                x: 47,
                y: 35,
                color: this.selectedColor,
            },
            {
                ruolo: 'Centrocampista',
                x: 47,
                y: 55,
                color: this.selectedColor,
            },
            {
                ruolo: 'Centrocampista',
                x: 50,
                y: 75,
                color: this.selectedColor,
            },
            { ruolo: 'Attaccante', x: 78, y: 40, color: this.selectedColor },
            { ruolo: 'Attaccante', x: 84, y: 55, color: this.selectedColor },
        ];
    }

    createInitialPlayersFor541() {
        return [
            { ruolo: 'Portiere', x: 9, y: 45, color: this.selectedColor },
            { ruolo: 'Difensore', x: 25, y: 15, color: this.selectedColor },
            { ruolo: 'Difensore', x: 23, y: 32, color: this.selectedColor },
            { ruolo: 'Difensore', x: 22, y: 45, color: this.selectedColor },
            { ruolo: 'Difensore', x: 23, y: 58, color: this.selectedColor },
            { ruolo: 'Difensore', x: 25, y: 75, color: this.selectedColor },
            {
                ruolo: 'Centrocampista',
                x: 50,
                y: 14,
                color: this.selectedColor,
            },
            {
                ruolo: 'Centrocampista',
                x: 47,
                y: 35,
                color: this.selectedColor,
            },
            {
                ruolo: 'Centrocampista',
                x: 47,
                y: 55,
                color: this.selectedColor,
            },
            {
                ruolo: 'Centrocampista',
                x: 50,
                y: 75,
                color: this.selectedColor,
            },
            { ruolo: 'Attaccante', x: 75, y: 45, color: this.selectedColor },
        ];
    }

    createInitialPlayersFor352() {
        return [
            { ruolo: 'Portiere', x: 9, y: 45, color: this.selectedColor },
            { ruolo: 'Difensore', x: 24, y: 32, color: this.selectedColor },
            { ruolo: 'Difensore', x: 22, y: 45, color: this.selectedColor },
            { ruolo: 'Difensore', x: 24, y: 58, color: this.selectedColor },
            {
                ruolo: 'Centrocampista',
                x: 46,
                y: 10,
                color: this.selectedColor,
            },
            {
                ruolo: 'Centrocampista',
                x: 47,
                y: 31,
                color: this.selectedColor,
            },
            {
                ruolo: 'Centrocampista',
                x: 42,
                y: 45,
                color: this.selectedColor,
            },
            {
                ruolo: 'Centrocampista',
                x: 45,
                y: 58,
                color: this.selectedColor,
            },
            {
                ruolo: 'Centrocampista',
                x: 50,
                y: 78,
                color: this.selectedColor,
            },
            { ruolo: 'Attaccante', x: 80, y: 40, color: this.selectedColor },
            { ruolo: 'Attaccante', x: 70, y: 55, color: this.selectedColor },
        ];
    }

    createInitialPlayersFor532() {
      return [
          { ruolo: 'Portiere', x: 9, y: 45, color: this.selectedColor },
          { ruolo: 'Difensore', x: 25, y: 15, color: this.selectedColor },
          { ruolo: 'Difensore', x: 23, y: 32, color: this.selectedColor },
          { ruolo: 'Difensore', x: 22, y: 45, color: this.selectedColor },
          { ruolo: 'Difensore', x: 23, y: 58, color: this.selectedColor },
          { ruolo: 'Difensore', x: 25, y: 75, color: this.selectedColor },
          {
              ruolo: 'Centrocampista',
              x: 47,
              y: 31,
              color: this.selectedColor,
          },
          {
              ruolo: 'Centrocampista',
              x: 42,
                y: 45,
              color: this.selectedColor,
          },
          {
              ruolo: 'Centrocampista',
              x: 45,
              y: 58,
              color: this.selectedColor,
          },
          { ruolo: 'Attaccante', x: 80, y: 51, color: this.selectedColor },
          { ruolo: 'Attaccante', x: 72, y: 40, color: this.selectedColor },
      ];
  }

    onPanchinaPlayerChange(event: any, role: string) {
        const playerId = event.target.value;
        const selectedPanchinaro = this.panchinaPlayers.find(
            (p) => p.id == Number(playerId)
        ); // Convertire playerId a numero

        if (selectedPanchinaro) {
            const playerIndex = this.players.findIndex(
                (p) => p.ruolo === role && !p.id
            );
            if (playerIndex !== -1) {
                this.players[playerIndex] = {
                    ...this.players[playerIndex],
                    id: selectedPanchinaro.id,
                    nomeCompleto: selectedPanchinaro.nomeCompleto,
                    ruolo: selectedPanchinaro.ruolo,
                    numeroMaglia: selectedPanchinaro.numeroMaglia,
                    color: this.selectedColor,
                };
            } else {
                alert(
                    `Hai già selezionato tutti i giocatori necessari per il ruolo ${role}.`
                );
            }
            this.resetSelect(role);
        }
    }

    

    saveCurrentPosition(player: any) {
        this.previousPositions = { ...player };
    }

    resetPositions() {
        this.players = [];
        this.setPlayersForModule(this.defaultModule);
    }

    restorePreviousPosition() {
        if (this.previousPositions) {
            const player = this.players.find(
                (p) => p.id === this.previousPositions.id
            );
            if (player) {
                player.x = this.previousPositions.x;
                player.y = this.previousPositions.y;
            }
        }
    }

    removePlayer(player: any) {
        this.players = this.players.filter((p) => p.id !== player.id);
    }

    resetSelect(role: string) {
        switch (role.toLowerCase()) {
            case 'portiere':
                this.selectedGoalkeeper = '';
                break;
            case 'difensore':
                this.selectedDefender = '';
                break;
            case 'centrocampista':
                this.selectedMidfielder = '';
                break;
            case 'attaccante':
                this.selectedForward = '';
                break;
            default:
                break;
        }
    }

    updatePlayerColors() {
        this.players.forEach((player) => {
            player.color = this.selectedColor;
        });
    }

    save(): void {
        this.isLoading = true; // Attiva lo spinner di caricamento
        const savedData: any = {
            colore: this.selectedColor,
            modulo: this.defaultModule,
            squadraId: Number(this.selectedSquadra),
            campionatoId: Number(this.selectedCampionato),
            giocatoriPosizionati: [],
            noteTattiche: this.tacticalNotes,
        };
        this.players.forEach((player) => {
            if (!player.id) {
                return;
            }
            let data = {
                calciatoreId: player.id,
                x: player.x,
                y: player.y,
            };
            savedData.giocatoriPosizionati.push(data);
        });

        this.salvatiSrv.saveData(savedData).subscribe(
            () => {
                this.isLoading = false; // Disattiva lo spinner di caricamento
                this.router.navigate(['/salvati']);
            },
            () => {
                this.isLoading = false; // Disattiva lo spinner di caricamento in caso di errore
            }
        );
    }

    navigateToTeamSelection() {
        this.router.navigate(['/scelta-squadra']);
    }
}
