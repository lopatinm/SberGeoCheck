import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  loader: boolean;

  constructor(private appService: AppService){
    this.loader = false;
    this.appService.loader.subscribe(loader => this.loader = loader);
  }
  ngOnInit() {
    
  }
  

}
