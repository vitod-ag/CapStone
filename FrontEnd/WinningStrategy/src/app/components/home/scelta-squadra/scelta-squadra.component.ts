import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campionato } from 'src/app/interface/campionato.interface';
import { Squadra } from 'src/app/interface/squadra.interface';
import { CampionatoService } from 'src/app/service/campionato.service';
import { SquadraService } from 'src/app/service/squadra.service';
import { ChangeDetectorRef } from '@angular/core';
import { finalize } from 'rxjs/operators';

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
  isLoading = false;

  constructor(
    private campionatoSrv: CampionatoService,
    private squadraSrv: SquadraService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.campionatoSrv.getCampionati().subscribe(data => {
      console.log('Campionati ricevuti:', data);
      this.campionati = data.content;
    });
  }

  onCampionatoChange(): void {
    this.squadraScelta = null;
    this.squadre = [];
    if (this.campionatoScelto && this.campionatoScelto.id !== undefined) {
      this.isLoading = true;
      this.squadraSrv.getSquadre(this.campionatoScelto.id!).pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); 
        })
      ).subscribe(data => {
        console.log('Squadre ricevute:', data);
        this.squadre = data;
        this.cdr.detectChanges(); 
      });
    }
  }

  onSquadraChange(): void {
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    if (this.squadraScelta) {
      this.router.navigate(['/pitch'], { queryParams: { squadraId: this.squadraScelta.id, campionatoId: this.campionatoScelto?.id} });
    }
  }
}
