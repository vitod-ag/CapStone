import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalvatiService } from 'src/app/service/salvati.service';

@Component({
  selector: 'app-salvati',
  templateUrl: './salvati.component.html',
  styleUrls: ['./salvati.component.scss']
})
export class SalvatiComponent implements OnInit{
  
  savedDataList: any;

  constructor(
    private salvatiSrv: SalvatiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.salvatiSrv.getSavedData().subscribe((data) => {
      console.log(data);
      
      this.savedDataList=data;
    });
  }

  clearSavedData(): void {
    this.salvatiSrv.clearSavedData();
    this.savedDataList = null;
  }

  saveAndGoBack(savedData: any): void {
    this.salvatiSrv.saveData(savedData).subscribe((response: any) => {
      const savedId = (response as { id: number }).id;
      this.router.navigate(['/pitch', savedId]); 
    });
  }


  goBack(): void {
    this.router.navigate(['/pitch']); 
  }

}