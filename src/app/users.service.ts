import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DataService
{
  constructor(http: HttpClient)
  {
    super("http://localhost:3000/users", http);
  }
}