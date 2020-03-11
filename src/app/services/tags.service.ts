import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService extends DataService {
  constructor(http: HttpClient) {
    super(`http://localhost:${environment.port}/api/tags`, http);
  }
}
