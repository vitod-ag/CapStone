import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatiSalvati } from 'src/app/interface/dati-salvati.interface';
import { SalvatiService } from 'src/app/service/salvati.service';

@Component({
  selector: 'app-salvati',
  templateUrl: './salvati.component.html',
  styleUrls: ['./salvati.component.scss']
})
export class SalvatiComponent implements OnInit{
  
  savedData: DatiSalvati | null = null;

  constructor(
    private salvatiSrv: SalvatiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.savedData = this.salvatiSrv.getSavedData();
  }

  clearSavedData(): void {
    this.salvatiSrv.clearSavedData();
    this.savedData = null;
  }

  goBack(): void {
    this.router.navigate(['/']); 
  }

}
