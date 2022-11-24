import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { UserModel } from './models/User.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, AfterViewChecked {
  title = 'site';
  user = UserModel;
  sendObject: Object | undefined;
  constructor(private appService: AppService,
              private titleService: Title,
              private cdRef: ChangeDetectorRef,
              private router: Router) {
    this.appService.title.subscribe(title => this.titleService.setTitle(title + ' - Главная'));
  }

  ngOnInit() {
    this.titleService.setTitle('Панель управления');
    if (localStorage.getItem("user") && localStorage.getItem("user") !== "") {
      this.user = JSON.parse(localStorage.getItem("user")!);
      this.sendObject = {
        token: this.user.token
      };
      this.appService.isLoggedUser(this.sendObject).subscribe(result => {
        if(result.status === 'success'){
          this.user = result.data;
          localStorage.setItem("user", JSON.stringify(this.user));
          this.router.navigate(['/']);
        }else{
          localStorage.setItem("user", "");
          this.router.navigate(['/login']);
        }
      });
    }else{
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}
