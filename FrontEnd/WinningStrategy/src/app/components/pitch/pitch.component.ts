import { Component } from '@angular/core';

@Component({
    selector: 'app-pitch',
    templateUrl: './pitch.component.html',
    styleUrls: ['./pitch.component.scss'],
})
export class PitchComponent {
    players = [
        { name: '#1', role: 'Role 1', x: 5, y: 50.2 },

        { name: '#2', role: 'Role 2', x: 22, y: 25 },
        { name: '#3', role: 'Role 3', x: 20, y: 40.8 },
        { name: '#5', role: 'Role 4', x: 20, y: 59.4 },
        { name: '#4', role: 'Role 5', x: 22, y: 75.4 },

        { name: '#6', role: 'Role 6', x: 41, y: 50.2 },
        { name: '#10', role: 'Role 7', x: 48, y: 33 },
        { name: '#8', role: 'Role 8', x: 48, y: 66.6 },

        { name: '#11', role: 'Role 9', x: 74, y: 80.3 },
        { name: '#7', role: 'Role 10', x: 74, y: 19.2 },
        { name: '#9', role: 'Role 11', x: 75, y: 50.2 },
    ];

    selectedColor = 'blue';
    selectedPlayer = this.players[0];
    tacticalNotes = '';
    defaultModule = '4-3-3';

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
            const target = event.target as HTMLElement;
            const dropX = (event.offsetX / target.clientWidth) * 100;
            const dropY = (event.offsetY / target.clientHeight) * 100;

            const targetPlayer = this.players.find((p) => p.name === player.name);
            if (targetPlayer) {
                targetPlayer.x = dropX;
                targetPlayer.y = dropY;
            }
        }
    }

    onModuleChange(event: any) {
        const module = event.target.value;
        this.defaultModule = module; // aggiorna il modulo predefinito
        this.setPlayersForModule(module);
    }

    setPlayersForModule(module: string) {
        switch (module) {
            case '4-3-3':
                this.players = [
                    { name: '#1', role: 'Role 1', x: 5, y: 50.2 },

                    { name: '#2', role: 'Role 2', x: 22, y: 25 },
                    { name: '#3', role: 'Role 3', x: 20, y: 40.8 },
                    { name: '#5', role: 'Role 4', x: 20, y: 59.4 },
                    { name: '#4', role: 'Role 5', x: 22, y: 75.4 },

                    { name: '#6', role: 'Role 6', x: 41, y: 50.2 },
                    { name: '#10', role: 'Role 7', x: 48, y: 33 },
                    { name: '#8', role: 'Role 8', x: 48, y: 66.6 },

                    { name: '#11', role: 'Role 9', x: 74, y: 80.3 },
                    { name: '#7', role: 'Role 10', x: 74, y: 19.2 },
                    { name: '#9', role: 'Role 11', x: 75, y: 50.2 },
                ];
                break;
            case '4-4-2':
                this.players = [
                    { name: '#1', role: 'Role 1', x: 5, y: 50.2 },

                    { name: '#2', role: 'Role 2', x: 22, y: 25 },
                    { name: '#3', role: 'Role 3', x: 20, y: 40.8 },
                    { name: '#5', role: 'Role 4', x: 20, y: 59.4 },
                    { name: '#4', role: 'Role 5', x: 22, y: 75.4 },

                    { name: '#7', role: 'Role 6', x: 50, y: 21 },
                    { name: '#6', role: 'Role 7', x: 48, y: 40.8 },
                    { name: '#8', role: 'Role 8', x: 48, y: 59.4 },
                    { name: '#11', role: 'Role 9', x: 50, y: 79.4 },

                    { name: '#10', role: 'Role 10', x: 73, y: 47.2 },
                    { name: '#9', role: 'Role 11', x: 82, y: 52 },
                ];
                break;
            case '5-4-1':
                this.players = [
                    { name: '#1', role: 'Role 1', x: 5, y: 50.2 },

                    { name: '#2', role: 'Role 2', x: 24, y: 20 },
                    { name: '#4', role: 'Role 3', x: 22, y: 35 },
                    { name: '#6', role: 'Role 4', x: 22, y: 50.2 },
                    { name: '#5', role: 'Role 5', x: 22, y: 65.5 },
                    { name: '#3', role: 'Role 6', x: 24, y: 83.4 },

                    { name: '#7', role: 'Role 7', x: 44, y: 25 },
                    { name: '#8', role: 'Role 8', x: 42, y: 42 },
                    { name: '#10', role: 'Role 9', x: 43, y: 56.5 },
                    { name: '#11', role: 'Role 10', x: 44, y: 73.4 },

                    { name: '#9', role: 'Role 11', x: 68, y: 50 },
                ];
                break;
            case '3-5-2':
                this.players = [
                    { name: '#1', role: 'Role 1', x: 5, y: 50.2 },

                    { name: '#2', role: 'Role 2', x: 22, y: 36 },
                    { name: '#3', role: 'Role 3', x: 20, y: 50 },
                    { name: '#4', role: 'Role 5', x: 22, y: 64 },

                    { name: '#7', role: 'Role 4', x: 51, y: 18 },
                    { name: '#6', role: 'Role 6', x: 45, y: 35 },
                    { name: '#5', role: 'Role 7', x: 40, y: 50.2 },
                    { name: '#8', role: 'Role 8', x: 49, y: 63 },
                    { name: '#11', role: 'Role 9', x: 51, y: 80.3 },

                    { name: '#10', role: 'Role 10', x: 71, y: 46 },
                    { name: '#9', role: 'Role 11', x: 82, y: 53 },
                ];
                break;
            default:
                break;
        }
    }

    resetPositions() {
        this.setPlayersForModule(this.defaultModule); 
    }

    save() {
        console.log('Salvato!');
    }
}
