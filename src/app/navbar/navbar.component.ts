import { Component, OnInit } from '@angular/core';
import { UserAuthService, User } from '../services/user-auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit
{
  user: User;

  constructor(public auth: UserAuthService) {}

  ngOnInit()
  {
    this.user = this.auth.user;
  }
}