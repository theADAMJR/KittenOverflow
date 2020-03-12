import { Component } from '@angular/core';
import { User, UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  get user() { return this.auth.user; }

  constructor(public auth: UserAuthService) {}
}
