import { Injectable } from '@angular/core';
import { City } from '../models/city';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private url = `${environment.apihost}/cities`

  constructor(
    private http: HttpClient,
  ) { }

  GetAll() {
    return this.http.get<City[]>(this.url);
  }
}
