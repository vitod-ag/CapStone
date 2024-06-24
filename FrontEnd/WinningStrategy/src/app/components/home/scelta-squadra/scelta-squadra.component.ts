import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campionato } from 'src/app/interface/campionato.interface';
import { Squadra } from 'src/app/interface/squadra.interface';
import { CampionatoService } from 'src/app/service/campionato.service';
import { SquadraService } from 'src/app/service/squadra.service';

@Component({
  selector: 'app-scelta-squadra',
  templateUrl: './scelta-squadra.component.html',
  styleUrls: ['./scelta-squadra.component.scss']
})
export class SceltaSquadraComponent implements OnInit {
  
  campionati: Campionato[] = [];
  squadre: Squadra[] = [];
  campionatoScelto: Campionato | null = null;
  squadraScelta: Squadra | null = null;

  constructor(
    private campionatoSrv: CampionatoService,
    private squadraSrv: SquadraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.campionatoSrv.getCampionati().subscribe(data => {
      console.log('Campionati ricevuti:', data);
      this.campionati = data.content;
    });
  }

  onCampionatoChange(): void {

    this.squadraScelta = null;
    
    if (this.campionatoScelto && this.campionatoScelto.id !== undefined) {
      this.squadraSrv.getSquadre(this.campionatoScelto.id!).subscribe(data => {
        console.log('Squadre ricevute:', data);
        this.squadre = data;
      });
    } else {
      this.squadre = [];
    }
  }

  onSubmit(): void {
    if (this.squadraScelta) {
      this.router.navigate(['/pitch'], { queryParams: { squadraId: this.squadraScelta.id } });
    }
  }
}
