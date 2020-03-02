import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends DataService
{
  constructor(route: ActivatedRoute, http: HttpClient)
  {
    const id = route.snapshot.paramMap.get("id");
    console.log(id);
        
    super("http://localhost:3000/users/" + id, http);
  }

  follow()
  {
    
  }
}
