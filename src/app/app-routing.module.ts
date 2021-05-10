import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';
import { ViewcontactsComponent } from './viewcontacts/viewcontacts.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component:HomeComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"viewcontacts",
    component:ViewcontactsComponent
  },
  {
    path:"update",
    component:UpdateComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
