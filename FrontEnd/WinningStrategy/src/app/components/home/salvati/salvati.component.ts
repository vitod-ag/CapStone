import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { SalvatiService } from 'src/app/service/salvati.service';

@Component({
    selector: 'app-salvati',
    templateUrl: './salvati.component.html',
    styleUrls: ['./salvati.component.scss'],
})
export class SalvatiComponent implements OnInit {
    savedDataList: any;
    user: User | undefined;

    constructor(private salvatiSrv: SalvatiService, private router: Router, private authSrv: AuthService) {}

    ngOnInit(): void {
        this.authSrv.user$.subscribe((data) =>
      {
        this.user = data?.user
      })
        this.salvatiSrv.getSavedData().subscribe((data) => {
            console.log(data);
            this.savedDataList = data;
        });
    }

    deleteSalvataggio(id: number) {
      if (window.confirm('Sei sicuro di cancellare il salvataggio?')) {
        this.salvatiSrv.deleteSalvataggio(id).subscribe( () => {
          this.salvatiSrv.getSavedData().subscribe((data) => {
            console.log(data);
            this.savedDataList = data;
        });
        });
      }
    }

    deleteSalvataggi() {
      if (window.confirm('Sei sicuro di cancellare tutti i salvataggi?')) {
          this.salvatiSrv.deleteSalvataggi(this.user?.idUtente).subscribe(() => {
            this.salvatiSrv.getSavedData().subscribe((data) => {
              console.log(data);
              this.savedDataList = data;
            });
          });
      }
  }
    goBack(): void {
      this.router.navigate(['/pitch']); 
    }
}
