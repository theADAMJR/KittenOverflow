import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService
{
  endpoint = "http://localhost:3000";
  user: User;

  constructor(private http: HttpClient, private router: Router) {}

  async signUp(user: Credentials)
  {
    const url = `${this.endpoint}/sign-up`;
    return await this.http.post(url, user).toPromise();
  }

  async login(user: Credentials)
  {
    console.log(user);
    
    const url = `${this.endpoint}/login`;
    const res: any = await this.http.post(url, user).toPromise();
      
    this.user = await this.getUser(res._id);
    this.router.navigate(["/user/" + this.user._id]);
  }

  logout()
  {
    this.user = null;
    this.router.navigate(["/"])
  }

  private async getUser(id)
  {
    const url = `${this.endpoint}/users/${id}`;
    return await this.http.get(url).toPromise() as User;
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