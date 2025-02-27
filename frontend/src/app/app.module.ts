import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function playerFactory() {
  return player
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LottieModule.forRoot({ player: playerFactory }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
