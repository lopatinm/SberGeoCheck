import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

import {Login} from "./models/login";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl = 'http://api.sbergeocheck.ru/v1/';

  public loader: EventEmitter<boolean> = new EventEmitter();
  public title: EventEmitter<string> = new EventEmitter();
  public error: EventEmitter<string> = new EventEmitter();

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private options = {headers: this.headers};


  constructor(private http: HttpClient) { }

  public login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'user/login', data, this.options)
      .pipe(
        catchError(this.handleError('data', data))
      );
  }

  public isLoggedUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'user/islogged', data, this.options)
      .pipe(
        catchError(this.handleError('data', data))
      );
  }

  public register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'user/registration', data, this.options)
      .pipe(
        catchError(this.handleError('data', data))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      this.error.emit(error.error.message);
      return of(result as T);
    };
  }
}
