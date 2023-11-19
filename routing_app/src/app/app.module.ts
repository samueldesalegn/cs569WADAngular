import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage.component';
import { ParentsComponent } from './parents.component';
import { ChildrenComponent } from './children.component';
import { RouterModule, Routes } from '@angular/router';
import { EditParentComponent } from './edit-parent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { protectGuard } from './protect.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomepageComponent },
  {
    path: 'parents',
    component: ParentsComponent,
    children: [
      { path: ':parent_name', component: ChildrenComponent },
      {
        path: ':parent_name/edit',
        component: EditParentComponent,
        canActivate: [protectGuard],
      },
    ],
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ParentsComponent,
    ChildrenComponent,
    EditParentComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {bindToComponentInputs: true})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
