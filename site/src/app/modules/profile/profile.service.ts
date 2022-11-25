import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of} from "rxjs";
import {timeout} from "rxjs/operators";
import {UserModel} from "../../models/User.model";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialog} from "../../dialogs/error/error.dialog";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private user = UserModel;
  apiUrl = 'http://api.sbergeocheck.ru/v1/';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private options = {headers: this.headers};

  constructor(private http: HttpClient,
              private dialog: MatDialog) { }

  
    public getQuestreq(): Observable<any> {
        this.user = JSON.parse(localStorage.getItem("user")!);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.user.token
        });
        const options = {headers: headers};
            
      return this.http.get(this.apiUrl + 'questreq', options).pipe(
        timeout(30000)
      );
  }
  
  public getMarks(): Observable<any> {
    this.user = JSON.parse(localStorage.getItem("user")!);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user.token
    });
    const options = {headers: headers};

    return this.http.get(this.apiUrl + 'placemark', options).pipe(
      timeout(30000)
    );
  }

  public getRequestMarks(): Observable<any> {
    this.user = JSON.parse(localStorage.getItem("user")!);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user.token
    });
    const options = {headers: headers};
    return this.http.get(this.apiUrl + 'request', options).pipe(
      timeout(30000)
    );
  }

  public saveMark(data: any): Observable<any> {
    this.user = JSON.parse(localStorage.getItem("user")!);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user.token
    });
    const options = {headers: headers};

    return this.http.put<any>(this.apiUrl+'quest/'+data.id, data, options)
      .pipe(
        catchError(this.handleError('data', data))
      );
  }


  public deleteRequest(data: any): Observable<any> {
    this.user = JSON.parse(localStorage.getItem("user")!);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user.token
    });
    const options = {headers: headers};

    return this.http.delete<any>(this.apiUrl+'request/'+data, options)
      .pipe(
        catchError(this.handleError('data', data))
      );
  }

  public deleteQuestreq(data: any): Observable<any> {
    this.user = JSON.parse(localStorage.getItem("user")!);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user.token
    });
    const options = {headers: headers};

    return this.http.delete<any>(this.apiUrl+'questreq/'+data, options)
      .pipe(
        catchError(this.handleError('data', data))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      this.openDialog(error.statusText);
      return of(result as T);
    };
  }

  public openDialog(msg:string): void {
    const dialogRef = this.dialog.open(ErrorDialog, {
      width: '300px',
      data: {message: msg}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
      }

    });
  }
}
