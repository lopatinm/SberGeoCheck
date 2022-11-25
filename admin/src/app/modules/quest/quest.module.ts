import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestComponent } from './quest/quest.component';
import { QuestService } from './quest.service';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { QuestRoutingModule } from './quest.routing';
import { ErrorModule } from 'src/app/dialogs/error/error.module';
import { AddquestComponent } from './addquest/addquest.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditquestComponent } from './editquest/editquest.component';

const mapConfig: YaConfig = {
  apikey: '64abfa2f-a2e0-47cf-85bc-2084c90754cb',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    QuestComponent,
    AddquestComponent,
    EditquestComponent,
  ],
  imports: [
    CommonModule,
    QuestRoutingModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    ErrorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [QuestService,MatDatepickerModule],
})
export class QuestModule { }
