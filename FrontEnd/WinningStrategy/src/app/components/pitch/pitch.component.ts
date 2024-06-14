import { Component } from '@angular/core';

@Component({
    selector: 'app-pitch',
    templateUrl: './pitch.component.html',
    styleUrls: ['./pitch.component.scss'],
})
export class PitchComponent {
    players = [
        { name: 'PT', role: 'Role 1', x: 5, y: 50.2 },

        { name: 'TS', role: 'Role 2', x: 22, y: 25 },
        { name: 'DC', role: 'Role 3', x: 20, y: 40.8 },
        { name: 'DC', role: 'Role 4', x: 20, y: 59.4 },
        { name: 'TD', role: 'Role 5', x: 22, y: 75.4 },

        { name: 'CDC', role: 'Role 6', x: 41, y: 50.2 },
        { name: 'CC', role: 'Role 7', x: 48, y: 33 },
        { name: 'CC', role: 'Role 8', x: 48, y: 66.6 },

        { name: 'AD', role: 'Role 9', x: 74, y: 80.3 },
        { name: 'AS', role: 'Role 10', x: 74, y: 19.2 },
        { name: 'ATT', role: 'Role 11', x: 75, y: 50.2 },
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

            const targetPlayer = this.players.find(
                (p) => p.name === player.name
            );
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
                    { name: 'PT', role: 'Role 1', x: 5, y: 50.2 },

                    { name: 'TS', role: 'Role 2', x: 22, y: 25 },
                    { name: 'DC', role: 'Role 3', x: 20, y: 40.8 },
                    { name: 'DC', role: 'Role 4', x: 20, y: 59.4 },
                    { name: 'TD', role: 'Role 5', x: 22, y: 75.4 },

                    { name: 'CDC', role: 'Role 6', x: 41, y: 50.2 },
                    { name: 'CC', role: 'Role 7', x: 48, y: 33 },
                    { name: 'CC', role: 'Role 8', x: 48, y: 66.6 },

                    { name: 'AD', role: 'Role 9', x: 74, y: 80.3 },
                    { name: 'AS', role: 'Role 10', x: 74, y: 19.2 },
                    { name: 'ATT', role: 'Role 11', x: 75, y: 50.2 },
                ];
                break;
            case '4-4-2':
                this.players = [
                    { name: 'PT', role: 'Role 1', x: 5, y: 50.2 },

                    { name: 'TS', role: 'Role 2', x: 22, y: 25 },
                    { name: 'DC', role: 'Role 3', x: 20, y: 40.8 },
                    { name: 'DC', role: 'Role 4', x: 20, y: 59.4 },
                    { name: 'TD', role: 'Role 5', x: 22, y: 75.4 },

                    { name: 'ES', role: 'Role 6', x: 50, y: 21 },
                    { name: 'CC', role: 'Role 7', x: 48, y: 40.8 },
                    { name: 'CC', role: 'Role 8', x: 48, y: 59.4 },
                    { name: 'ED', role: 'Role 9', x: 50, y: 79.4 },

                    { name: 'AT', role: 'Role 10', x: 73, y: 47.2 },
                    { name: 'ATT', role: 'Role 11', x: 82, y: 52 },
                ];
                break;
            case '5-4-1':
                this.players = [
                    { name: 'PT', role: 'Role 1', x: 5, y: 50.2 },

                    { name: 'TS', role: 'Role 2', x: 24, y: 20 },
                    { name: 'DCS', role: 'Role 3', x: 22, y: 35 },
                    { name: 'DC', role: 'Role 4', x: 22, y: 50.2 },
                    { name: 'DCD', role: 'Role 5', x: 22, y: 65.5 },
                    { name: 'TD', role: 'Role 6', x: 24, y: 83.4 },

                    { name: 'ES', role: 'Role 7', x: 44, y: 25 },
                    { name: 'CC', role: 'Role 8', x: 42, y: 42 },
                    { name: 'CC', role: 'Role 9', x: 43, y: 56.5 },
                    { name: 'ED', role: 'Role 10', x: 44, y: 73.4 },

                    { name: 'ATT', role: 'Role 11', x: 68, y: 50 },
                ];
                break;
            case '3-5-2':
                this.players = [
                    { name: 'PT', role: 'Role 1', x: 5, y: 50.2 },

                    { name: 'DCS', role: 'Role 2', x: 22, y: 36 },
                    { name: 'DC', role: 'Role 3', x: 20, y: 50 },
                    { name: 'DCD', role: 'Role 5', x: 22, y: 64 },

                    { name: 'ES', role: 'Role 4', x: 51, y: 18 },
                    { name: 'CC', role: 'Role 6', x: 45, y: 35 },
                    { name: 'CDC', role: 'Role 7', x: 40, y: 50.2 },
                    { name: 'CC', role: 'Role 8', x: 49, y: 63 },
                    { name: 'ED', role: 'Role 9', x: 51, y: 80.3 },

                    { name: 'AT', role: 'Role 10', x: 71, y: 46 },
                    { name: 'ATT', role: 'Role 11', x: 82, y: 53 },
                ];
                break;
            default:
                break;
        }
    }

    resetPositions() {
        this.setPlayersForModule(this.defaultModule);
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
