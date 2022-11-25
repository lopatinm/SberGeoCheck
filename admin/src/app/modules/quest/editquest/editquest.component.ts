import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { YaEvent, YaReadyEvent } from 'angular8-yandex-maps';
import { AppService } from 'src/app/app.service';
import { UserModel } from 'src/app/models/User.model';
import { QuestService } from '../quest.service';

@Component({
  selector: 'app-editquest',
  templateUrl: './editquest.component.html',
  styleUrls: ['./editquest.component.scss']
})
export class EditquestComponent {
  questId: number | undefined;
  hide = true;
  message: string | undefined;
  user = UserModel;
  error: boolean = false;
  loader: boolean = false;
  editForm = new FormGroup({
    id: new FormControl(''),
    category_id: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    user_id: new FormControl(''),
    title: new FormControl(''),
    info: new FormControl(''),
    about: new FormControl(''),
    img: new FormControl(''),
    level: new FormControl(''),
    timek: new FormControl(''),
    datestart: new FormControl(''),
    dateend: new FormControl(''),
    rating: new FormControl(''),
    comments: new FormControl(''),
    price: new FormControl(''),
  });

  constructor(private appService: AppService,
    private router: Router,
    private questService: QuestService) {
      this.message = "";
      
  }
  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    if (localStorage.getItem("questsid") && localStorage.getItem("questsid") !== "") {
      this.questId = Number(localStorage.getItem("questsid"));
  }
  if (localStorage.getItem("quests") && localStorage.getItem("quests") !== "") {
    let quests = JSON.parse(localStorage.getItem("quests")!);
    quests.forEach((el: { id: any; 
                          category_id: any, 
                          latitude: any, 
                          longitude: any, 
                          user_id: any, 
                          title: any, 
                          info: any, 
                          about: any, 
                          img: any, 
                          level: any, 
                          timek: any, 
                          datestart: any, 
                          dateend: any, 
                          rating: any, 
                          comments: any, 
                          price: any})=>{
        if(this.questId == el.id){
          this.editForm.controls['id'].setValue(el.id);
          this.editForm.controls['category_id'].setValue(el.category_id);
          this.editForm.controls['latitude'].setValue(el.latitude);
          this.editForm.controls['longitude'].setValue(el.longitude);
          this.editForm.controls['title'].setValue(el.title);
          this.editForm.controls['info'].setValue(el.info);
          this.editForm.controls['about'].setValue(el.about);
          this.editForm.controls['img'].setValue(el.img);
          this.editForm.controls['level'].setValue(el.level);
          this.editForm.controls['timek'].setValue(el.timek);
          this.editForm.controls['datestart'].setValue(el.datestart);
          this.editForm.controls['dateend'].setValue(el.dateend);
          this.editForm.controls['rating'].setValue(el.rating);
          this.editForm.controls['comments'].setValue(el.comments);
          this.editForm.controls['price'].setValue(el.price);
          var myPlacemark = new ymaps.Placemark([el.latitude, el.longitude], 
            {balloonContent: 'ID: #'+el.id}, {
            iconLayout: 'default#image',
            iconImageHref: 'assets/marker.png',
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42]
        });
        event.target.geoObjects.add(myPlacemark);
          
          }
      });

    }
    if (localStorage.getItem("user") && localStorage.getItem("user") !== "") {
      this.user = JSON.parse(localStorage.getItem("user")!);
      this.editForm.controls['user_id'].setValue(this.user.id.toString());
    }
  }
  
  ngOnInit(): void {
  }

  saveQuest(){
    this.error = false;
    this.message = "Подождите, загрузка...";
    this.appService.loader.emit(true);
    this.questService.saveQuest(this.editForm.value).subscribe(result => {
      this.appService.loader.emit(false);
      this.message = "";
        this.router.navigate(['/quest']);
    });
  }

  onMapClick(e: YaEvent<ymaps.Map>): void {
    const { target, event } = e;
    const coords = event.get('coords');
    target.geoObjects.each(function (geoObject) { 
      target.geoObjects.remove(geoObject);
     });

      var myPlacemark = new ymaps.Placemark([coords[0].toPrecision(8), coords[1].toPrecision(8)], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'assets/marker.png',
        iconImageSize: [30, 42],
        iconImageOffset: [-3, -42]
    });

    target.geoObjects.add(myPlacemark);
    this.editForm.controls['latitude'].setValue(coords[0].toPrecision(8));
    this.editForm.controls['longitude'].setValue(coords[1].toPrecision(8));
  }
}
