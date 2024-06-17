import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PitchComponent } from './pitch/pitch.component';
import { Error404Component } from './components/error404/error404.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "pitch", component: PitchComponent},
  {path: "error404", component: Error404Component},
  {path: "**", redirectTo: "error404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


