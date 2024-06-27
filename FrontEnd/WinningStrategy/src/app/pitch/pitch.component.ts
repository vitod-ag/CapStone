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
    // Implementa questa funzione se necessario
  }

  saveCurrentPosition(player: any) {
    this.previousPositions = { ...player };
  }

  resetPositions() {
    // Resetta l'array players vuoto
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

  ngAfterViewInit() {
    const saveButton = document.getElementById('saveButton');
    const tooltip = saveButton?.querySelector('.tooltip');

    if (saveButton && tooltip) {
      saveButton.addEventListener('click', () => {
        tooltip.textContent = 'Salvato';
        saveButton.classList.add('saved');
        setTimeout(() => {
          tooltip.textContent = 'Save!';
          saveButton.classList.remove('saved');
        }, 1000);
      });
    }
  }

  onPanchinaPlayerChange(event: any, role: string) {
    const playerId = event.target.value;
    const selectedPanchinaro = this.panchinaPlayers.find((p) => p.id == playerId);

    // Verifica se il giocatore è già presente tra i giocatori schierati
    const isPlayerAlreadySelected = this.players.some((p) => p.id === selectedPanchinaro?.id);

    if (selectedPanchinaro && !isPlayerAlreadySelected) {
      this.selectedPlayer = {
        id: selectedPanchinaro.id,
        name: selectedPanchinaro.nomeCompleto,
        role: selectedPanchinaro.ruolo,
        x: 50,
        y: 50,
      };
      this.players.push(this.selectedPlayer);
      this.resetSelect(role);
    } else {
      alert('Questo giocatore è già stato schierato sul campo.');
    }
  }

  removePlayer(player: any) {
    this.players = this.players.filter((p) => p.id !== player.id);
    this.resetSelect(player.role.toLowerCase());
    this.selectedPlayer.name='';
  }

  resetSelect(role: string) {
    switch (role) {
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
