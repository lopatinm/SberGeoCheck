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
      this.placemarks = [];
      result.forEach((el: { id: any; latitude: any; longitude: any; comment: any;}) => {
        let mark = {id: el.id, latitude: el.latitude, longitude: el.longitude, comment: el.comment, status: true};
        this.placemarks?.push(mark);
      });

      this.navigatorService.getMarks().subscribe(res => {
        res.forEach((el: { request_id: any; latitude: any; longitude: any; comment: any;}) => {
          let mark = {id: el.request_id, latitude: el.latitude, longitude: el.longitude, comment: el.comment, status: false};
          this.placemarks?.push(mark);
        });
        this.placemarks?.forEach((request: { id: any; latitude: any; longitude: any; comment: any; status: any;}) => {
          if(request.status){
            var myPlacemark = new ymaps.Placemark([request.latitude, request.longitude], 
              {balloonContent: 'ID: #'+request.id+'<br />'+request.comment}, {
              iconLayout: 'default#image',
              iconImageHref: 'assets/marker.png',
              iconImageSize: [30, 42],
              iconImageOffset: [-3, -42]
          });
          }else{
            var myPlacemark = new ymaps.Placemark([request.latitude, request.longitude], 
              {balloonContent: 'ID: #'+request.id+'<br />'+request.comment}, {
              iconLayout: 'default#image',
              iconImageHref: 'assets/marker2.png',
              iconImageSize: [30, 42],
              iconImageOffset: [-3, -42]
          });
          }
          

          event.target.geoObjects.add(myPlacemark);
        });
        this.appService.loader.emit(false);
      });
      
    });
  }

  mapcenter(lat:any, lon:any){
    this.map?.setCenter([lat,lon]);
  }

  markAccept(id:any, i: any){
    this.navigatorService.markAccept({'id': id}).subscribe(result => {
      if(this.placemarks){
        this.placemarks[i].status = false;
        this.map?.geoObjects.each((geoObject) => { 
          this.map?.geoObjects.remove(geoObject);
        });
  
        this.placemarks?.forEach((request: { id: any; latitude: any; longitude: any; comment: any; status:any;}) => {

          if(request.status){
            var myPlacemark = new ymaps.Placemark([request.latitude, request.longitude], 
              {balloonContent: 'ID: #'+request.id+'<br />'+request.comment}, {
              iconLayout: 'default#image',
              iconImageHref: 'assets/marker.png',
              iconImageSize: [30, 42],
              iconImageOffset: [-3, -42]
          });
          }else{
            var myPlacemark = new ymaps.Placemark([request.latitude, request.longitude], 
              {balloonContent: 'ID: #'+request.id+'<br />'+request.comment}, {
              iconLayout: 'default#image',
              iconImageHref: 'assets/marker2.png',
              iconImageSize: [30, 42],
              iconImageOffset: [-3, -42]
          });
          }

          this.map?.geoObjects.add(myPlacemark);
        });
      }
  });
  }

  requestDelete(id:any, i:any){
    
    if(this.placemarks){
      const mark = this.placemarks[i];
      
      if(!mark.status){
        
        this.navigatorService.markRemove({'id': id}).subscribe(result => {
          if(this.placemarks){
            this.placemarks[i].status = true;
            this.placemarks[i].id = result.data.id;
            this.map?.geoObjects.each((geoObject) => { 
              this.map?.geoObjects.remove(geoObject);
            });
      
            this.placemarks?.forEach((request: { id: any; latitude: any; longitude: any; comment: any; status:any;}) => {
  
              if(request.status){
                var myPlacemark = new ymaps.Placemark([request.latitude, request.longitude], 
                  {balloonContent: 'ID: #'+request.id+'<br />'+request.comment}, {
                  iconLayout: 'default#image',
                  iconImageHref: 'assets/marker.png',
                  iconImageSize: [30, 42],
                  iconImageOffset: [-3, -42]
              });
              }else{
                var myPlacemark = new ymaps.Placemark([request.latitude, request.longitude], 
                  {balloonContent: 'ID: #'+request.id+'<br />'+request.comment}, {
                  iconLayout: 'default#image',
                  iconImageHref: 'assets/marker2.png',
                  iconImageSize: [30, 42],
                  iconImageOffset: [-3, -42]
              });
              }
  
              this.map?.geoObjects.add(myPlacemark);
            });
          }
        });

      }else{
        this.navigatorService.deleteRequest(id).subscribe(result => {
          this.placemarks?.splice(i,1);
          this.map?.geoObjects.each((geoObject) => { 
            this.map?.geoObjects.remove(geoObject);
          });
    
          this.placemarks?.forEach((request: { id: any; latitude: any; longitude: any; comment: any; status:any;}) => {

            if(request.status){
              var myPlacemark = new ymaps.Placemark([request.latitude, request.longitude], 
                {balloonContent: 'ID: #'+request.id+'<br />'+request.comment}, {
                iconLayout: 'default#image',
                iconImageHref: 'assets/marker.png',
                iconImageSize: [30, 42],
                iconImageOffset: [-3, -42]
            });
            }else{
              var myPlacemark = new ymaps.Placemark([request.latitude, request.longitude], 
                {balloonContent: 'ID: #'+request.id+'<br />'+request.comment}, {
                iconLayout: 'default#image',
                iconImageHref: 'assets/marker2.png',
                iconImageSize: [30, 42],
                iconImageOffset: [-3, -42]
            });
            }

            this.map?.geoObjects.add(myPlacemark);
          });
    
        });
      }
      

    }    
  }

  ngOnInit(): void {

  }
}
