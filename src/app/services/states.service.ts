import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../models/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  private url = `${environment.apihost}/states`

  constructor(
    private http: HttpClient,
  ) { }

  GetAll() {
    return this.http.get<State[]>(this.url);
  }

}
