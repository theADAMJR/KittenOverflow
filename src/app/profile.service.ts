import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService, User } from './services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnInit
{
  user: User;

  constructor(private route: ActivatedRoute, private auth: UserAuthService) {}
  
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.user = await this.auth.getUser(id);
  }

  follow()
  {
    
  }
}
