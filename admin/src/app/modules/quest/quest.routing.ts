import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddquestComponent } from './addquest/addquest.component';
import { QuestComponent } from './quest/quest.component';

const routes: Routes = [
  { path: '', component: QuestComponent},
  { path: 'add', component: AddquestComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestRoutingModule { }