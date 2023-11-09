import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SamuelComponent } from './samuel.component';
import { DefarComponent } from './defar.component';
import { JoshuaComponent } from './joshua.component';

@NgModule({
  declarations: [
    AppComponent,
    SamuelComponent,
    DefarComponent,
    JoshuaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
