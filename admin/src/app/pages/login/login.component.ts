import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { UserModel } from 'src/app/models/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  user = UserModel;
  message: string;
  error: boolean = false;
  loader: boolean = false;
  loginForm = new FormGroup({
    phone: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private appService: AppService,
              private router: Router) {
    this.appService.loader.subscribe(loader => this.loader = loader);
    this.appService.error.subscribe(error => this.message = error);
    this.appService.loader.emit(false);
    this.appService.title.emit('Авторизация');
    localStorage.setItem("user", "");
    this.message = "Введите данные";
  }

  ngOnInit(): void {
  }

  login() {
    this.error = false;
    this.message = "Подождите, идет авторизация...";
    this.appService.loader.emit(true);
    this.appService.login(this.loginForm.value).subscribe(result => {
      if(result.status === 'success'){
        this.appService.loader.emit(false);
        this.user = result.data;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.router.navigate(['/']);
      }else{
        this.error = true;
        this.appService.loader.emit(false);
        localStorage.setItem("user", "");
      }
    });
  }
}
