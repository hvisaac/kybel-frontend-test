import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  signIn(username: any, password: any) {
    this.authService.auth({
      username,
      password
    }).subscribe((c:any) => { if (c) localStorage.setItem('BearerToken', c.token) })
  }

}
