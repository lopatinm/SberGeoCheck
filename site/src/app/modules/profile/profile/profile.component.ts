import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { AppService } from 'src/app/app.service';
import { ProfileService } from '../profile.service';
import { Mark } from 'src/app/models/mark';
import { Questreq } from 'src/app/models/questreq';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  map: ymaps.Map | undefined;
  placemarks: Mark[] | undefined;
  questreq: Questreq[] | undefined;
  constructor(private profileService: ProfileService,
    private appService: AppService){

  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
    this.profileService.getRequestMarks().subscribe(result => {
      this.placemarks = [];
      result.forEach((el: { id: any; latitude: any; longitude: any; comment: any;}) => {
        let mark = {id: el.id, latitude: el.latitude, longitude: el.longitude, comment: el.comment, status: true};
        this.placemarks?.push(mark);
      });

      this.profileService.getMarks().subscribe(res => {
        res.forEach((el: { request_id: any; latitude: any; longitude: any; comment: any;}) => {
          let mark = {id: el.request_id, latitude: el.latitude, longitude: el.longitude, comment: el.comment, status: false};
          this.placemarks?.push(mark);
        });
        this.placemarks?.forEach((request: { id: any; latitude: any; longitude: any; comment: any;}) => {
          var myPlacemark = new ymaps.Placemark([request.latitude, request.longitude], 
              {balloonContent: 'ID: #'+request.id+'<br />'+request.comment}, {
              iconLayout: 'default#image',
              iconImageHref: 'assets/marker.png',
              iconImageSize: [30, 42],
              iconImageOffset: [-3, -42]
          });
          event.target.geoObjects.add(myPlacemark);
        });
        this.appService.loader.emit(false);
      });
      
    });

    this.profileService.getQuestreq().subscribe(result => {
        this.questreq = result;
    });
  }
  
  
  questreqDelete(id:any, i:any){
    this.profileService.deleteQuestreq(id).subscribe(result => {
      this.questreq?.splice(i,1);
    });
  }


  requestDelete(id:any, i:any){
    
    if(this.placemarks){
      const mark = this.placemarks[i];
      
      this.profileService.deleteRequest(id).subscribe(result => {
        this.placemarks?.splice(i,1);
        this.map?.geoObjects.each((geoObject) => { 
          this.map?.geoObjects.remove(geoObject);
        });
  
        this.placemarks?.forEach((request: { id: any; latitude: any; longitude: any;}) => {
          let myPlacemark = new ymaps.Placemark([request.latitude, request.longitude], 
              {balloonContent: 'ID: #'+request.id}, {
              iconLayout: 'default#image',
              iconImageHref: 'assets/marker.png',
              iconImageSize: [30, 42],
              iconImageOffset: [-3, -42]
          });
          this.map?.geoObjects.add(myPlacemark);
        });
  
      });
      

    }    
  }

}
