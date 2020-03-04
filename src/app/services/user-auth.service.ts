import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  user: User;
  endpoint = 'http://localhost:3000/api';

  get loggedIn() { return new JwtHelperService().isTokenExpired(this.token); }
  private get token() { return localStorage.getItem('token'); }

  constructor(private http: HttpClient, private router: Router) {
    this.getCurrentUser().then(user => this.user = user); }

  async signUp(user: Credentials) {
    const res: any = await this.http.post(`${this.endpoint}/sign-up`, user).toPromise();

    if (res) {
      localStorage.setItem('token', res);
      this.user =  await this.getCurrentUser();
    }
    return Boolean(res);
  }

  async login(user: Credentials) {
    const res: any = await this.http.post(`${this.endpoint}/login`, user).toPromise();

    if (res) {
      localStorage.setItem('token', res);
      this.user = await this.getCurrentUser();
    }
    return Boolean(res);
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
  }

  async getUser(id: string) {
    return this.http.get(`${this.endpoint}/users/${id}`).toPromise() as Promise<User>;
  }

  private async getCurrentUser() {
    const id = (this.token) ? new JwtHelperService().decodeToken(this.token)._id : null;
    return this.getUser(id);
  }
}

export interface User {
  _id: string;
  username: string;
  avatarURL: string;
  bio: string;
  tags: string[];
  createdAt: Date;
}

export interface Credentials {
  username: string;
  password: string;
}
