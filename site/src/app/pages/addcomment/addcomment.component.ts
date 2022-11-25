import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { YaEvent } from 'angular8-yandex-maps';
import { AppService } from 'src/app/app.service';
import { UserModel } from 'src/app/models/User.model';

@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.scss']
})
export class AddcommentComponent implements OnInit{
  hide = true;
  message: string;
  user = UserModel;
  error: boolean = false;
  loader: boolean = false;
  addForm = new FormGroup({
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    comment: new FormControl(''),
    inn: new FormControl(''),
    user_id: new FormControl(''),
  });
  
  constructor(private appService: AppService,
    private router: Router) {
      this.message = "";
      if (localStorage.getItem("user") && localStorage.getItem("user") !== "") {
        this.user = JSON.parse(localStorage.getItem("user")!);

        this.addForm.controls['user_id'].setValue(this.user.id.toString());
      }
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

  ngOnInit(): void {
    
  }
  
  addcomment() {
    this.error = false;
    this.message = "Подождите, загрузка...";
    this.appService.loader.emit(true);
    this.appService.addcomment(this.addForm.value).subscribe(result => {
      this.appService.loader.emit(false);
      this.message = "";
        this.router.navigate(['/']);
    });
  }

}
