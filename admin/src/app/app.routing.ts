import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';
import { AddcommentComponent } from './pages/addcomment/addcomment.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
  {path: '', component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent},
      { path: 'addcomment.html', component: AddcommentComponent},
    ]},
  { path: 'login.html', component: LoginComponent},
  { path: 'registration.html', component: RegistrationComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
