import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("BearerToken");
    if (!token) {
      return next.handle(req)
    }

    const headers = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`)
    })

    return next.handle(headers)
  }


}
