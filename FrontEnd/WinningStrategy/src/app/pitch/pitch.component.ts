import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalciatoreService } from '../service/calciatore.service';
import { DatiSalvati } from '../interface/dati-salvati.interface';
import { Calciatore } from '../interface/calciatore.interface';
import { SalvatiService } from '../service/salvati.service';

@Component({
  selector: 'app-pitch',
  templateUrl: './pitch.component.html',
  styleUrls: ['./pitch.component.scss'],
})
export class PitchComponent implements OnInit {
  players: any[] = [];
  panchinaPlayers: Calciatore[] = [];
  goalkeepers: Calciatore[] = [];
  defenders: Calciatore[] = [];
  midfielders: Calciatore[] = [];
  forwards: Calciatore[] = [];
  selectedColor = 'blue';
  selectedPlayer: any = {};
  tacticalNotes = '';
  defaultModule = '4-3-3';
  previousPositions: any = null;
  lastMovedPlayer: any = null;

  selectedGoalkeeper = '';
  selectedDefender = '';
  selectedMidfielder = '';
  selectedForward = '';

  constructor(
    private route: ActivatedRoute,
    private calciatoreSrv: CalciatoreService,
    private router: Router,
    private salvatiSrv: SalvatiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const squadraId = params['squadraId'];
      if (squadraId) {
        this.calciatoreSrv.getCalciatoriBySquadreId(squadraId).subscribe((data) => {
          this.panchinaPlayers = data;
          this.filterPlayersByRole();
        });
      }
    });
  }

  filterPlayersByRole() {
    this.goalkeepers = this.panchinaPlayers.filter((p) => p.ruolo === 'Portiere');
    this.defenders = this.panchinaPlayers.filter((p) => p.ruolo === 'Difensore');
    this.midfielders = this.panchinaPlayers.filter((p) => p.ruolo === 'Centrocampista');
    this.forwards = this.panchinaPlayers.filter((p) => p.ruolo === 'Attaccante');
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

      const targetPlayer = this.players.find((p) => p.id === player.id);
      if (targetPlayer) {
        targetPlayer.x = dropX;
        targetPlayer.y = dropY;
        this.lastMovedPlayer = targetPlayer;
      } else {
        player.x = dropX;
        player.y = dropY;
        this.players.push(player);
      }
    }
  }

  onModuleChange(event: any) {
    const module = event.target.value;
    this.defaultModule = module;
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
      default:
        this.players = [];
        break;
    }
  }

  createInitialPlayersFor433() {
    return [
      { ruolo: 'Portiere', x: 10, y: 50, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 30, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 50, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 70, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 90, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 30, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 50, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 70, color: this.selectedColor },
      { ruolo: 'Attaccante', x: 70, y: 30, color: this.selectedColor },
      { ruolo: 'Attaccante', x: 70, y: 50, color: this.selectedColor },
      { ruolo: 'Attaccante', x: 70, y: 70, color: this.selectedColor }
    ];
  }

  createInitialPlayersFor442() {
    return [
      { ruolo: 'Portiere', x: 10, y: 50, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 30, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 50, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 70, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 90, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 20, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 40, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 60, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 80, color: this.selectedColor },
      { ruolo: 'Attaccante', x: 70, y: 40, color: this.selectedColor },
      { ruolo: 'Attaccante', x: 70, y: 60, color: this.selectedColor }
    ];
  }

  createInitialPlayersFor541() {
    return [
      { ruolo: 'Portiere', x: 10, y: 50, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 20, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 40, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 60, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 80, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 90, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 20, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 40, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 60, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 80, color: this.selectedColor },
      { ruolo: 'Attaccante', x: 70, y: 50, color: this.selectedColor }
    ];
  }

  createInitialPlayersFor352() {
    return [
      { ruolo: 'Portiere', x: 10, y: 50, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 30, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 50, color: this.selectedColor },
      { ruolo: 'Difensore', x: 30, y: 70, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 20, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 40, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 60, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 80, color: this.selectedColor },
      { ruolo: 'Centrocampista', x: 50, y: 90, color: this.selectedColor },
      { ruolo: 'Attaccante', x: 70, y: 40, color: this.selectedColor },
      { ruolo: 'Attaccante', x: 70, y: 60, color: this.selectedColor }
    ];
  }

  onPanchinaPlayerChange(event: any, role: string) {
    const playerId = event.target.value;
    const selectedPanchinaro = this.panchinaPlayers.find((p) => p.id == Number(playerId)); 

    if (selectedPanchinaro) {
      const playerIndex = this.players.findIndex((p) => p.ruolo === role);
      if (playerIndex !== -1) {
        this.players[playerIndex] = {
          ...this.players[playerIndex],
          id: selectedPanchinaro.id,
          nomeCompleto: selectedPanchinaro.nomeCompleto,
          ruolo: selectedPanchinaro.ruolo,
          numeroMaglia: selectedPanchinaro.numeroMaglia,
          color: this.selectedColor
        };
      }
      this.resetSelect(role);
    }
  }

  saveCurrentPosition(player: any) {
    this.previousPositions = { ...player };
  }

  resetPositions() {
    this.players = [];
  }

  restorePreviousPosition() {
    if (this.previousPositions) {
      const player = this.players.find((p) => p.id === this.previousPositions.id);
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

  save(): void {
    const savedData: DatiSalvati = {
      players: this.players,
      noteTattiche: this.tacticalNotes,
    };

    this.salvatiSrv.saveData(savedData);
    this.router.navigate(['/salvati']);
  }

  navigateToTeamSelection() {
    this.router.navigate(['/scelta-squadra']);
  }
}
