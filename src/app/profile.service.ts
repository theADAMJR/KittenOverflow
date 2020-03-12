import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserAuthService } from './services/user-auth.service';

export class ProfileService implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private auth: UserAuthService) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.user = await this.auth.getUser(id);
  }

  follow() {

  }
}
