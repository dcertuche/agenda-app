import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: string, password: string) {
    return this.http
      .post(environment.loginUrl, { username: user, password })
      .pipe(
        map((response: any) => {
          const expiresAt = moment().add(response['expiresIn'], 'second');

          localStorage.setItem('app_user_id', response['userId']);
          localStorage.setItem('app_name', response['name']);
          localStorage.setItem('app_role', response['authorities']);
          localStorage.setItem('app_token', response['token']);
          localStorage.setItem(
            'app_expires_at',
            JSON.stringify(expiresAt.valueOf())
          );

          return response;
        })
      );
  }

  getName() {
    return localStorage.getItem('app_name') || '';
  }

  getToken() {
    return localStorage.getItem('app_token');
  }

  isAdmin() {
    return localStorage.getItem('app_role') == 'ROLE_ADMIN';
  }

  isLoggedIn() {
    const expiration = localStorage.getItem('app_expires_at');

    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment().isBefore(moment(expiresAt));
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('app_user_id');
    localStorage.removeItem('app_name');
    localStorage.removeItem('app_role');
    localStorage.removeItem('app_token');
    localStorage.removeItem('app_expires_at');
  }

  verificarUserName(userName: string) {
    return this.http.get(
      `${environment.apiBase}/auth/verificar-username?username=${userName}`
    );
  }
}
