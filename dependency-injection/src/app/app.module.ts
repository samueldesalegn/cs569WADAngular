// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskService } from './task.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [TaskService], // Register the service here
  bootstrap: [AppComponent],
})
export class AppModule {}

