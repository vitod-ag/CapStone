import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PitchComponent } from './components/pitch/pitch.component';
import { Error404Component } from './components/error404/error404.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "pitch", component: PitchComponent},
  {path: "error404", component: Error404Component},
  {path: "**", redirectTo: "error404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


