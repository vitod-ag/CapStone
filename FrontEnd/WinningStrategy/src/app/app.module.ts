import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { JumbotronComponent } from './components/home/jumbotron/jumbotron.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { PitchComponent } from './pitch/pitch.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/home/main/main.component';
import { Error404Component } from './components/error404/error404.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoogleLoginComponent } from './components/dashboard/google-login/google-login.component';
import { SceltaSquadraComponent } from './components/home/scelta-squadra/scelta-squadra.component';
import { SalvatiComponent } from './components/home/salvati/salvati.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwapPlayerModalComponent } from './components/home/swap-player-modal/swap-player-modal.component';
import { ProfiloComponent } from './components/dashboard/profilo/profilo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    FooterComponent,
    PitchComponent,
    HomeComponent,
    MainComponent,
    Error404Component,
    DashboardComponent,
    GoogleLoginComponent,
    SceltaSquadraComponent,
    SalvatiComponent,
    SwapPlayerModalComponent,
    ProfiloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '559578333262-egpo6kc7m3d8cfrm2aqtvjpbhcm90eft.apps.googleusercontent.com', {
                scopes: 'openid profile email',
              }
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
