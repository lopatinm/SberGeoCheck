import { Component, OnInit } from '@angular/core';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { AppService } from 'src/app/app.service';
import { Mark } from 'src/app/models/mark';
import { NavigatorService } from '../navigator.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit{

  map: ymaps.Map | undefined;
  placemarks: Mark[] | undefined;
  

  constructor(private appService: AppService,
    private navigatorService: NavigatorService) {    
  }
  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
    this.navigatorService.getRequests().subscribe(result => {
      this.placemarks = result;
      result.forEach((request: { id: any; latitude: any; longitude: any;}) => {
        var myPlacemark = new ymaps.Placemark([request.latitude, request.longitude], 
            {balloonContent: 'ID: #'+request.id}, {
            iconLayout: 'default#image',
            iconImageHref: 'assets/marker.png',
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42]
        });
        event.target.geoObjects.add(myPlacemark);
      });
      this.appService.loader.emit(false);
    });
  }

  mapcenter(lat:any, lon:any){
    this.map?.setCenter([lat,lon]);
  }

  markAccept(id:any){
    this.navigatorService.markAccept({'id': id}).subscribe(result => {

  });
  }
  ngOnInit(): void {

  }
}
