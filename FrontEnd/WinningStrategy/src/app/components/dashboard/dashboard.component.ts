import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  [x: string]: any;
  register = false;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.authSrv.user$.subscribe((user) => {
        
          if (user) {
              this.router.navigate(['/home']);
          }
      });
  }
  onSubmit(form: NgForm) {
      try {
          this.authSrv.login(form.value).subscribe((data) => {
              this.router.navigate(['/home']);
          });
      } catch (error) {
          console.log(error);
      }
  }

  onSubmitRegister(form: NgForm) {
      try {
          let value = {
              username: form.value.usernameRegister,
              password: form.value.passwordRegister,
              email: form.value.emailRegister,
              nome: form.value.nomeRegister,
              cognome: form.value.cognomeRegister,
          };
          this.authSrv.register(value).subscribe((data) => {
              window.alert('Registrazione effettuata. Effettua il login');
          });
      } catch (error) {
          console.error(error);
      }
  }

  @ViewChild('container') container!: ElementRef;

  signIn() {
      this.container.nativeElement.classList.remove('right-panel-active');
  }

  signUp() {
      this.container.nativeElement.classList.add('right-panel-active');
  }
}
