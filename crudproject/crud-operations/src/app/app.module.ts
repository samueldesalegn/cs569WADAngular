import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListComponent } from './todos/list.component';
import { AddComponent } from './todos/add.component';
import { UpdateComponent } from './todos/update.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { AuthService } from './auth.service';
import { addTokenInterceptor } from './add-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    UpdateComponent,
    SigninComponent,
    SignupComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'signin', component: SigninComponent },
        { path: 'signup', component: SignupComponent },
        {
          path: 'list',
          component: ListComponent,
          canActivate: [() => inject(AuthService).isLoggedIn()],
        },
        { path: 'add', component: AddComponent },
        { path: 'update/:todo_id', component: UpdateComponent },
      ],
      { bindToComponentInputs: true }
    ),
  ],
  providers: [provideHttpClient(withInterceptors([addTokenInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
