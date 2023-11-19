import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { WordsComponent } from './words.component';
import { HistoryComponent } from './history.component';
import { SettingsComponent } from './settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StateService } from './state.service';
import { ColorDirective } from './color.directive';

function bootstap() {
  const state = inject(StateService).state;
  return () => {
    const stored_state = localStorage.getItem('WORDS_GAME');
    if (stored_state) {
      state.set(JSON.parse(stored_state)); // memory
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    WordsComponent,
    HistoryComponent,
    SettingsComponent,
    ColorDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'words', pathMatch: 'full' },
      { path: 'words', component: WordsComponent, pathMatch: 'full' },
      { path: 'history', component: HistoryComponent, pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
    ]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: bootstap,
      deps: [StateService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
