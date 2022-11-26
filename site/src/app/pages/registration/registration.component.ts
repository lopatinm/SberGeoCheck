import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { UserModel } from 'src/app/models/User.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  hide = true;
  user = UserModel;
  message: string;
  error: boolean = false;
  loader: boolean = false;
  loginForm = new FormGroup({
    phone: new FormControl(''),
    fullname: new FormControl(''),
  });

  constructor(private appService: AppService,
              private router: Router) {
    this.appService.loader.subscribe(loader => this.loader = loader);
    this.appService.error.subscribe(error => this.message = error);
    this.appService.loader.emit(false);
    this.appService.title.emit('Регистрация');
    localStorage.setItem("user", "");
    this.message = "Введите данные";
  }

  ngOnInit(): void {
  }

  register() {
    this.error = false;
    this.message = "Подождите, идет регистрация...";
    this.appService.loader.emit(true);
    this.appService.register(this.loginForm.value).subscribe(result => {
      if(result.status === 'success'){
        this.appService.loader.emit(false);
        this.appService.isLogged.emit(true);
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
