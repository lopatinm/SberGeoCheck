import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { UserModel } from 'src/app/models/User.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  loader: boolean;
  user = UserModel;
  isLogged: boolean;
  
  constructor(private appService: AppService){
    this.loader = false;
    this.isLogged = false;
    this.appService.loader.subscribe(loader => this.loader = loader);
    if (localStorage.getItem("user") && localStorage.getItem("user") !== "") {
      this.user = JSON.parse(localStorage.getItem("user")!);
      this.isLogged = true;
    }

  }
  ngOnInit() {
    
  }
  

}
