import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Races } from '../interfaces/races.interface';

const ORIGIN = 'https://herospace.pl/api';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) {}

  private searchedHeroSource = new BehaviorSubject<Hero[]>(null);
  currentHero = this.searchedHeroSource.asObservable();
  
  updateHeroSource(hero: Hero[]) {
    this.searchedHeroSource.next(hero);
  }

  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'https://herospace.pl/'
  })

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  searchHero(name) {
    this.http.get<Hero>(ORIGIN + '/hero?name=' + name, {headers: this.headers})
    .subscribe((value) => {
      this.updateHeroSource(value['data']);
    })
  }

  getHeroList() {
    return this.http.get<Hero>(ORIGIN + '/hero', {headers: this.headers})
    .pipe(
      catchError(this.handleError)
    )    
  }

  getHero(id) {
    return this.http.get<Hero>(ORIGIN + '/hero/'+id, {headers: this.headers})
    .pipe(
      catchError(this.handleError)
    )  
  }

  addHero(hero) {
    console.log(hero);
    return this.http.post(ORIGIN + '/hero', hero, {headers: this.headers})
  }

  getRaces() {
    return this.http.get<Races>(ORIGIN + '/race', {headers: this.headers})
    .pipe(
      catchError(this.handleError)
    )
  }

  getAvatar(id): Observable<Blob> {
    return this.http.get('https://picsum.photos/200', {responseType: "blob"})
    .pipe(
      catchError(this.handleError)
    )
  }
}
