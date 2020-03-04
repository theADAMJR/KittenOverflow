import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends DataService {
  constructor(http: HttpClient) {
    super(`http://localhost:${environment.port}/api/posts`, http);
  }
}
