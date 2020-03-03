import { JwtHelperService,  } from "@auth0/angular-jwt";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService
{
  endpoint = "http://localhost:3000";

  get loggedIn() { return new JwtHelperService().isTokenExpired(this.token) }

  get user() { return (this.token) ? new JwtHelperService().decodeToken(this.token) : null }

  private get token() { return localStorage.getItem("token") }

  constructor(private http: HttpClient, private router: Router) {}

  async signUp(user: Credentials) {
    const res: any = await this.http.post(`${this.endpoint}/sign-up`, user).toPromise();
    
    if (res)
      localStorage.setItem("token", res);
    return Boolean(res);
  }

  async login(user: Credentials) {
    const res: any = await this.http.post(`${this.endpoint}/login`, user).toPromise();

    if (res)
      localStorage.setItem("token", res);
    return Boolean(res);
  }

  logout() { localStorage.removeItem("token") }
  
  async getUser(id: string) {
    return await this.http.get(`${this.endpoint}/users/${id}`).toPromise() as Promise<User>;
  }
}

export interface User
{
  _id: string,
  username: string,
  avatarURL: string,
  bio: string,
  tags: string[],
  createdAt: Date
}

export interface Credentials
{
  username: string,
  password: string
}