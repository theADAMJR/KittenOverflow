import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserAuthService, User } from '../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService] // used for activated routes in service
})
export class ProfileComponent implements OnInit {
  profileUser: User = {} as User;
  isSelf = false;
  isFollowing = false;

  private profileId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: UserAuthService,
    private service: UsersService) {}

  async ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id');

    try { await this.refreshProfileUser();
    } catch { return this.router.navigate(['/404']); }

    this.isSelf = this.profileId === this.auth.user._id;
    this.isFollowing = this.auth.user.following
      .some(id => id === this.profileId);
  }

  avatarUrl = () => `http://localhost:${environment.port}/api/users/${this.profileId}/avatar`;

  async follow() {
    this.isFollowing = true;

    try {
      await this.service.follow(this.profileId);
    } catch {} finally {
      await this.refreshProfileUser(); }
  }

  async unfollow() {
    this.isFollowing = false;

    try {
      await this.service.unfollow(this.profileId);
    } catch {} finally {
      await this.refreshProfileUser(); }
  }

  private async refreshProfileUser() {
    this.profileUser = await this.auth.getUser(this.profileId);
  }
}
