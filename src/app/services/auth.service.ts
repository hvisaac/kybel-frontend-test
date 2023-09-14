import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apihost}/Authentication/auth`

  constructor(
    private http: HttpClient,
  ) { }
  
  auth(model: User) {
    return this.http.post(this.url, model);
  }

  validatePermissions(): boolean {

    if (localStorage.getItem('BearerToken')) return true

    return false
  }
}
