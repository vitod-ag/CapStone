import { Component } from '@angular/core';

@Component({
  selector: 'app-pitch',
  templateUrl: './pitch.component.html',
  styleUrls: ['./pitch.component.scss']
})
export class PitchComponent {
  players = [
    { name: '#1', role: 'Role 1', x: 45, y: 290 },

    { name: '#2', role: 'Role 2', x: 200, y: 80 },
    { name: '#3', role: 'Role 3', x: 180, y: 210 },
    { name: '#5', role: 'Role 4', x: 180, y: 350 },
    { name: '#4', role: 'Role 5', x: 200, y: 500 },

    { name: '#6', role: 'Role 6', x: 280, y: 290 },
    { name: '#10', role: 'Role 7', x: 360, y: 200 },
    { name: '#8', role: 'Role 8', x: 360, y: 370 },

    { name: '#11', role: 'Role 9', x: 580, y: 480 },
    { name: '#7', role: 'Role 10', x: 580, y: 100 },
    { name: '#9', role: 'Role 11', x: 650, y: 290 },
  ];

  selectedColor = 'blue';
  selectedPlayer = this.players[0];  // Seleziona il primo giocatore per default
  tacticalNotes = '';

  onDragStart(event: DragEvent, player: any) {
    event.dataTransfer?.setData('text/plain', JSON.stringify(player));
    this.selectedPlayer = player;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    if (data) {
      const player = JSON.parse(data);
      const dropX = event.offsetX;
      const dropY = event.offsetY;

      // Trova il giocatore corretto e aggiorna la sua posizione
      const targetPlayer = this.players.find(p => p.name === player.name);
      if (targetPlayer) {
        targetPlayer.x = dropX;
        targetPlayer.y = dropY;
      }
    }
  }

  onModuleChange(event: any) {
    const module = event.target.value;
    switch (module) {
      case '4-3-3':
        this.players = [
          { name: '#1', role: 'Role 1', x: 45, y: 290 },

          { name: '#2', role: 'Role 2', x: 200, y: 80 },
          { name: '#3', role: 'Role 3', x: 180, y: 210 },
          { name: '#4', role: 'Role 4', x: 180, y: 350 },
          { name: '#5', role: 'Role 5', x: 200, y: 500 },

          { name: '#6', role: 'Role 6', x: 280, y: 290 },
          { name: '#7', role: 'Role 7', x: 360, y: 200 },
          { name: '#8', role: 'Role 8', x: 360, y: 370 },

          { name: '#9', role: 'Role 9', x: 580, y: 480 },
          { name: '#10', role: 'Role 10', x: 580, y: 100 },
          { name: '#11', role: 'Role 11', x: 650, y: 290 },
        ];
        break;
      case '4-4-2':
        this.players = [
          { name: '#1', role: 'Role 1', x: 45, y: 290 },

          { name: '#2', role: 'Role 2', x: 200, y: 80 },
          { name: '#5', role: 'Role 3', x: 180, y: 210 },
          { name: '#4', role: 'Role 4', x: 180, y: 350 },
          { name: '#3', role: 'Role 5', x: 200, y: 500 },

          { name: '#7', role: 'Role 6', x: 380, y: 100 },
          { name: '#6', role: 'Role 7', x: 350, y: 210 },
          { name: '#8', role: 'Role 8', x: 350, y: 350 },
          { name: '#11', role: 'Role 9', x: 380, y: 480 },

          { name: '#10', role: 'Role 10', x: 600, y: 250 },
          { name: '#9', role: 'Role 11', x: 520, y: 320 },
        ];
        break;
      case '5-4-1':
        this.players = [
          { name: '#1', role: 'Role 1', x: 45, y: 290 },

          { name: '#2', role: 'Role 2', x: 220, y: 80 },
          { name: '#4', role: 'Role 3', x: 200, y: 200 },
          { name: '#6', role: 'Role 4', x: 200, y: 290 },
          { name: '#5', role: 'Role 5', x: 200, y: 380 },
          { name: '#3', role: 'Role 6', x: 220, y: 500 },

          { name: '#7', role: 'Role 7', x: 400, y: 120 },
          { name: '#8', role: 'Role 8', x: 380, y: 240 },
          { name: '#10', role: 'Role 9', x: 390, y: 340 },
          { name: '#11', role: 'Role 10', x: 400, y: 480 },

          { name: '#9', role: 'Role 11', x: 580, y: 290 },
        ];
        break;
      default:
        break;
    }
  }

  resetPositions() {
    this.onModuleChange({ target: { value: '4-3-3' } });  // Reset al modulo di default 4-3-3
  }

  save() {
    // Implementa la logica di salvataggio
    console.log('Salvato!');
  }
}
