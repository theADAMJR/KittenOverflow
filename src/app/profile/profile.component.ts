import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserAuthService, User } from '../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService] // used for activated routes in service
})
export class ProfileComponent implements OnInit
{
  user: User = {} as User;

  constructor(private route: ActivatedRoute, private router: Router, private auth: UserAuthService) {}
  
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.user = await this.auth.getUser(id);
    if (!this.user)
      this.router.navigate(["/404"]);
  }
}