import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent,
  canActivate: [AppGuard],
  canActivateChild: [AppGuard],
    children: [
      { path: '', component: DashboardComponent},
      { path: 'navigator', loadChildren: () => import('./modules/navigator/navigator.module').then(m => m.NavigatorModule)},
      { path: 'quest', loadChildren: () => import('./modules/quest/quest.module').then(m => m.QuestModule)},
    ]},
  { path: 'login.html', component: LoginComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
