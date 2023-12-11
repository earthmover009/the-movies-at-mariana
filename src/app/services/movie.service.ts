import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  public getMovies(): Observable<any> {
    return this.httpClient.get("./assets/movies/index.json");
  }
}
