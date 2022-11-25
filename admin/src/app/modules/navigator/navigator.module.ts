import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorComponent } from './navigator/navigator.component';
import { NavigatorRoutingModule } from './navigator.routing';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from "@angular/material/card";
import {ErrorDialog} from "../../dialogs/error/error.dialog";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavigatorService } from './navigator.service';

const mapConfig: YaConfig = {
  apikey: '64abfa2f-a2e0-47cf-85bc-2084c90754cb',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    NavigatorComponent,
    ErrorDialog
  ],
  entryComponents: [ErrorDialog],
  imports: [
    CommonModule,
    NavigatorRoutingModule,
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
    MatDialogModule
  ],
  providers: [NavigatorService],
})
export class NavigatorModule { }
