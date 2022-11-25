import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { YaEvent } from 'angular8-yandex-maps';
import { AppService } from 'src/app/app.service';
import { UserModel } from 'src/app/models/User.model';
import { QuestService } from '../quest.service';

@Component({
  selector: 'app-addquest',
  templateUrl: './addquest.component.html',
  styleUrls: ['./addquest.component.scss']
})
export class AddquestComponent implements OnInit{
  
  hide = true;
  message: string | undefined;
  user = UserModel;
  error: boolean = false;
  loader: boolean = false;
  addForm = new FormGroup({
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
      if (localStorage.getItem("user") && localStorage.getItem("user") !== "") {
        this.user = JSON.parse(localStorage.getItem("user")!);
        this.addForm.controls['user_id'].setValue(this.user.id.toString());
      }
  }
  
  ngOnInit(): void {
  }

  addQuest(){
    this.error = false;
    this.message = "Подождите, загрузка...";
    this.appService.loader.emit(true);
    this.questService.addQuest(this.addForm.value).subscribe(result => {
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
    this.addForm.controls['latitude'].setValue(coords[0].toPrecision(8));
    this.addForm.controls['longitude'].setValue(coords[1].toPrecision(8));
  }
}
