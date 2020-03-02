import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService
{
  endpoint: string = 'http://localhost:3000/';
  user: User;
  
  get token() { return localStorage.getItem("token") }
  get loggedIn() { return Boolean(this.token) }

  constructor(private http: HttpClient, private router: Router) {}

  signUp(user: User)
  {
    const url = `${this.endpoint}/register`;
    return this.http.post(url, user);
  }

  login(user: User)
  {
    const url = `${this.endpoint}/login`;
    return this.http.post(url, user)
      .subscribe((res: any) =>
      {
        localStorage.setItem("token", res.token);
        this.getUser(res._id)
          .subscribe((res: User) =>
          {
            this.user = res;
            this.router.navigate(["user/" + res._id])
          });
      });
  }

  logout()
  {
    const removeToken: any = localStorage.removeItem("token");
    if (!removeToken)
      this.router.navigate(["login"]);
    this.user = null;
  }

  getUser(id)
  {
    const url = `${this.endpoint}/users/${id}`;
    return this.http.get(url);
  }
}

export interface User
{
  _id: string,
  username: string,
  bio: string,
  tags: string[],
  createdAt: Date
}