import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BreedsComponent } from './breeds.component';
import { SubBreedsComponent } from './sub-breeds.component';
import { Routes, RouterModule } from '@angular/router';
import { banGuard } from './ban.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'breeds', pathMatch: 'full' },
  { path: 'breeds', component: BreedsComponent,
    children: [
      { path: ':breed/sub-breeds', component: SubBreedsComponent, canActivate:[banGuard] },

    ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent, BreedsComponent, SubBreedsComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes, {bindToComponentInputs: true})],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
