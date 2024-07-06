import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PitchComponent } from './pitch/pitch.component';
import { Error404Component } from './components/error404/error404.component';
import { AuthGuard } from './guard/auth.guard';
import { SceltaSquadraComponent } from './components/home/scelta-squadra/scelta-squadra.component';
import { SalvatiComponent } from './components/home/salvati/salvati.component';
import { ProfiloComponent } from './components/dashboard/profilo/profilo.component';
import { NoAuthGuard } from './guard/no-auth.guard';


const routes: Routes = [
  {path: "", component: DashboardComponent, canActivate: [NoAuthGuard]},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "pitch", component: PitchComponent, canActivate: [AuthGuard]},
  {path: "scelta-squadra", component: SceltaSquadraComponent, canActivate: [AuthGuard]},
  {path: "salvati", component: SalvatiComponent, canActivate: [AuthGuard]},
  {path: "error404", component: Error404Component},
  {path: "profilo", component: ProfiloComponent, canActivate: [AuthGuard]},
  {path: "**", redirectTo: "error404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


