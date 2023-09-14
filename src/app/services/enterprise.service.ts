import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enterprise } from '../models/enterprise';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  private url = `${environment.apihost}/enterprises`

  constructor(
    private http: HttpClient,
  ) { }

  GetAll() {
    return this.http.get<Enterprise[]>(this.url);
  }

  Create(enterprise: Enterprise) {
    enterprise.idUsuario = 1
    console.log(enterprise)
    return this.http.post(this.url, enterprise)
  }

  Update(id: number, enterprise: Enterprise) {
    enterprise.idUsuario = 1
    enterprise.id = id
    console.log(enterprise)
    return this.http.put(this.url + `/${id}`, enterprise)
  }
}
