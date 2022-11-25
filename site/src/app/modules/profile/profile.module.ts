import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProfileService } from './profile.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorModule } from 'src/app/dialogs/error/error.module';

const mapConfig: YaConfig = {
  apikey: '64abfa2f-a2e0-47cf-85bc-2084c90754cb',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    ProfileRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    ErrorModule
  ],
  providers: [ProfileService],
})
export class ProfileModule { }
