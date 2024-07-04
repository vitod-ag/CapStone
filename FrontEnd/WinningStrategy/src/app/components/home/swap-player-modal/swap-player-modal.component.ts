import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-swap-player-modal',
  templateUrl: './swap-player-modal.component.html',
  styleUrls: ['./swap-player-modal.component.scss']
})
export class SwapPlayerModalComponent implements OnInit {
  @Input() players: any[] = [];
  @Input() panchinaPlayers: any[] = [];
  @Input() role!: string;

  availableFieldPlayers: any[] = [];
  availableBenchPlayers: any[] = [];
  selectedFieldPlayer: any;
  selectedBenchPlayer: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.filterPlayersByRole();
  }

  filterPlayersByRole() {
    this.availableFieldPlayers = this.players.filter(player => player.ruolo === this.role);
    this.availableBenchPlayers = this.panchinaPlayers.filter(player => player.ruolo === this.role);
  }

  swapPlayers() {
    console.log('Swap Players Called');
    console.log('Selected Field Player:', this.selectedFieldPlayer);
    console.log('Selected Bench Player:', this.selectedBenchPlayer);

    // Ensure that the IDs are numbers
    const selectedFieldPlayerId = parseInt(this.selectedFieldPlayer, 10);
    const selectedBenchPlayerId = parseInt(this.selectedBenchPlayer, 10);

    const fieldPlayerIndex = this.players.findIndex(p => p.id === selectedFieldPlayerId);
    const benchPlayerIndex = this.panchinaPlayers.findIndex(p => p.id === selectedBenchPlayerId);

    console.log('Field Player Index:', fieldPlayerIndex);
    console.log('Bench Player Index:', benchPlayerIndex);

    if (fieldPlayerIndex !== -1 && benchPlayerIndex !== -1) {
      const fieldPlayer = this.players[fieldPlayerIndex];
      const benchPlayer = this.panchinaPlayers[benchPlayerIndex];

      console.log('Field Player:', fieldPlayer);
      console.log('Bench Player:', benchPlayer);

      // Swap positions and other properties if necessary
      this.players[fieldPlayerIndex] = {
        ...benchPlayer,
        x: fieldPlayer.x,
        y: fieldPlayer.y,
        color: fieldPlayer.color
      };
      this.panchinaPlayers[benchPlayerIndex] = {
        ...fieldPlayer,
        x: benchPlayer.x,
        y: benchPlayer.y,
        color: benchPlayer.color
      };

      console.log('Swapped Players:', this.players, this.panchinaPlayers);

      this.activeModal.close({ players: this.players, panchinaPlayers: this.panchinaPlayers });
    } else {
      console.error('Invalid player selection for swapping.');
    }
  }
}
