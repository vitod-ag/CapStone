import { Component, OnInit } from '@angular/core';
import { Calciatore } from '../interface/calciatore.interface';
import { ActivatedRoute } from '@angular/router';
import { CalciatoreService } from '../service/calciatore.service';

@Component({
    selector: 'app-pitch',
    templateUrl: './pitch.component.html',
    styleUrls: ['./pitch.component.scss'],
})
export class PitchComponent implements OnInit {
    players = [
        { id: 1, name: 'PT', role: 'Role 1', x: 5, y: 50.2 },
        { id: 2, name: 'TS', role: 'Role 2', x: 22, y: 25 },
        { id: 3, name: 'DC', role: 'Role 3', x: 20, y: 40.8 },
        { id: 4, name: 'DC', role: 'Role 4', x: 20, y: 59.4 },
        { id: 5, name: 'TD', role: 'Role 5', x: 22, y: 75.4 },
        { id: 6, name: 'CDC', role: 'Role 6', x: 41, y: 50.2 },
        { id: 7, name: 'CC', role: 'Role 7', x: 48, y: 33 },
        { id: 8, name: 'CC', role: 'Role 8', x: 48, y: 66.6 },
        { id: 9, name: 'AD', role: 'Role 9', x: 74, y: 80.3 },
        { id: 10, name: 'AS', role: 'Role 10', x: 74, y: 19.2 },
        { id: 11, name: 'ATT', role: 'Role 11', x: 75, y: 50.2 },
      ];
    
      panchinaPlayers: Calciatore[] = [];
      selectedColor = 'blue';
      selectedPlayer = this.players[0];
      tacticalNotes = '';
      defaultModule = '4-3-3';
      previousPositions: any = null;
      lastMovedPlayer: any = null;
    
      constructor(
        private route: ActivatedRoute,
        private calciatoreSrv: CalciatoreService
      ) {}
    
      ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
          const squadraId = params['squadraId'];
          console.log(squadraId);
          
          if (squadraId) {
            this.calciatoreSrv
              .getCalciatoriBySquadreId(squadraId)
              .subscribe((data) => {
                console.log(data);
                this.panchinaPlayers = data;
              });
          }
        });
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
          }
        }
      }
    
      onModuleChange(event: any) {
        const module = event.target.value;
        this.defaultModule = module;
        this.setPlayersForModule(module);
      }
    

    setPlayersForModule(module: string) {
        switch (module) {
            case '4-3-3':
                this.players = [
                    { id: 1, name: 'PT', role: 'Role 1', x: 5, y: 50.2 },
                    { id: 2, name: 'TS', role: 'Role 2', x: 22, y: 25 },
                    { id: 3, name: 'DC', role: 'Role 3', x: 20, y: 40.8 },
                    { id: 4, name: 'DC', role: 'Role 4', x: 20, y: 59.4 },
                    { id: 5, name: 'TD', role: 'Role 5', x: 22, y: 75.4 },
                    { id: 6, name: 'CDC', role: 'Role 6', x: 41, y: 50.2 },
                    { id: 7, name: 'CC', role: 'Role 7', x: 48, y: 33 },
                    { id: 8, name: 'CC', role: 'Role 8', x: 48, y: 66.6 },
                    { id: 9, name: 'AD', role: 'Role 9', x: 74, y: 80.3 },
                    { id: 10, name: 'AS', role: 'Role 10', x: 74, y: 19.2 },
                    { id: 11, name: 'ATT', role: 'Role 11', x: 75, y: 50.2 },
                ];
                break;
            case '4-4-2':
                this.players = [
                    { id: 1, name: 'PT', role: 'Role 1', x: 5, y: 50.2 },
                    { id: 2, name: 'TS', role: 'Role 2', x: 22, y: 25 },
                    { id: 3, name: 'DC', role: 'Role 3', x: 20, y: 40.8 },
                    { id: 4, name: 'DC', role: 'Role 4', x: 20, y: 59.4 },
                    { id: 5, name: 'TD', role: 'Role 5', x: 22, y: 75.4 },
                    { id: 6, name: 'ES', role: 'Role 6', x: 50, y: 21 },
                    { id: 7, name: 'CC', role: 'Role 7', x: 48, y: 40.8 },
                    { id: 8, name: 'CC', role: 'Role 8', x: 48, y: 59.4 },
                    { id: 9, name: 'ED', role: 'Role 9', x: 50, y: 79.4 },
                    { id: 10, name: 'AT', role: 'Role 10', x: 73, y: 47.2 },
                    { id: 11, name: 'ATT', role: 'Role 11', x: 82, y: 52 },
                ];
                break;
            case '5-4-1':
                this.players = [
                    { id: 1, name: 'PT', role: 'Role 1', x: 5, y: 50.2 },
                    { id: 2, name: 'TS', role: 'Role 2', x: 24, y: 20 },
                    { id: 3, name: 'DCS', role: 'Role 3', x: 22, y: 35 },
                    { id: 4, name: 'DC', role: 'Role 4', x: 22, y: 50.2 },
                    { id: 5, name: 'DCD', role: 'Role 5', x: 22, y: 65.5 },
                    { id: 6, name: 'TD', role: 'Role 6', x: 24, y: 83.4 },
                    { id: 7, name: 'ES', role: 'Role 7', x: 44, y: 25 },
                    { id: 8, name: 'CC', role: 'Role 8', x: 42, y: 42 },
                    { id: 9, name: 'CC', role: 'Role 9', x: 43, y: 56.5 },
                    { id: 10, name: 'ED', role: 'Role 10', x: 44, y: 73.4 },
                    { id: 11, name: 'ATT', role: 'Role 11', x: 68, y: 50 },
                ];
                break;
            case '3-5-2':
                this.players = [
                    { id: 1, name: 'PT', role: 'Role 1', x: 5, y: 50.2 },
                    { id: 2, name: 'DCS', role: 'Role 2', x: 22, y: 36 },
                    { id: 3, name: 'DC', role: 'Role 3', x: 20, y: 50 },
                    { id: 4, name: 'DCD', role: 'Role 5', x: 22, y: 64 },
                    { id: 5, name: 'ES', role: 'Role 4', x: 51, y: 18 },
                    { id: 6, name: 'CC', role: 'Role 6', x: 45, y: 35 },
                    { id: 7, name: 'CDC', role: 'Role 7', x: 40, y: 50.2 },
                    { id: 8, name: 'CC', role: 'Role 8', x: 49, y: 63 },
                    { id: 9, name: 'ED', role: 'Role 9', x: 51, y: 80.3 },
                    { id: 10, name: 'AT', role: 'Role 10', x: 71, y: 46 },
                    { id: 11, name: 'ATT', role: 'Role 11', x: 82, y: 53 },
                ];
                break;
            default:
                break;
        }
    }

    saveCurrentPosition(player: any) {
        this.previousPositions = { ...player };
    }

    resetPositions() {
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

    save() {
        console.log('Salvato!');
    }
}
