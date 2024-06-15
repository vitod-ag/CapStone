import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { JumbotronComponent } from './components/home/jumbotron/jumbotron.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { PitchComponent } from './components/pitch/pitch.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/home/main/main.component';
import { Error404Component } from './components/error404/error404.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProfiloComponent } from './components/dashboard/profilo/profilo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    FooterComponent,
    PitchComponent,
    HomeComponent,
    DashboardComponent,
    MainComponent,
    Error404Component,
    ProfiloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
