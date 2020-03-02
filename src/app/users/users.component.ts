import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit
{
  users = []

  constructor(private service: UsersService) {}

  async ngOnInit()
  {
    this.users = await this.service.get();
  }
}
