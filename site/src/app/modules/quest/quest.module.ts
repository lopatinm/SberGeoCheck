import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestComponent } from './quest/quest.component';
import { QuestService } from './quest.service';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { ErrorModule } from 'src/app/dialogs/error/error.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { QuestRoutingModule } from './quest.routing';

const mapConfig: YaConfig = {
  apikey: '64abfa2f-a2e0-47cf-85bc-2084c90754cb',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    QuestComponent
  ],
  imports: [
    CommonModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    QuestRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    ErrorModule
  ],
  providers: [QuestService],
})
export class QuestModule { }
