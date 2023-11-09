import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard.component';
import { ButtonsComponent } from './buttons.component';
import { CheatingComponent } from './cheating.component';
import { HistoryComponent } from './history.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    ButtonsComponent,
    CheatingComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
