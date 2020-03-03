import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService] // used for activated routes in service
})
export class ProfileComponent implements OnInit
{
  user: any;

  constructor(private service: ProfileService) {}

  async ngOnInit()
  {
    this.user = await this.service.get();
  }

  follow()
  {
    alert("Test");
  }
}