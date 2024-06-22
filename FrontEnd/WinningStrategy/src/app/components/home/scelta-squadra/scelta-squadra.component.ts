import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Campionato } from 'src/app/interface/campionato.interface';
import { Squadra } from 'src/app/interface/squadra.interface';
import { CampionatoService } from 'src/app/service/campionato.service';

@Component({
  selector: 'app-scelta-squadra',
  templateUrl: './scelta-squadra.component.html',
  styleUrls: ['./scelta-squadra.component.scss']
})
export class SceltaSquadraComponent {
  campionati: Campionato[] = [];
  squadre: Squadra[] = [];
  campionatoScelto: Campionato | null = null;
  squadraScelta: Squadra | null = null;

  constructor(private campionaService: CampionatoService, private router:Router) {}

  ngOnInit(): void {
    this.campionaService.getCampionati().subscribe(data => {
      console.log('Campionati ricevuti:', data);
      this.campionati = data.content;
    })
  }

  onCampionatoChange(): void {
      this.squadre = this.campionatoScelto ? this.campionatoScelto.squadre : [];
  }

  onSubmit(): void {
    if (this.squadraScelta) {
      this.router.navigate(['/pitch'], { queryParams: { squadre: this.squadraScelta} });
    }
  }
}
