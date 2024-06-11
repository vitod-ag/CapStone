import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PitchComponent } from './components/dashboard/pitch/pitch.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "pitch", component: PitchComponent},
  { path: 'projects', component: ProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


