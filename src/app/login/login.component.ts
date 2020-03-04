import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { UserAuthService, Credentials } from '../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private auth: UserAuthService,
    private route: ActivatedRoute,
    private router: Router) {}

  form = new FormGroup(
  {
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  async login(user: Credentials) {
    let login = false;
    try { login = await this.auth.login(user); } catch { this.form.setErrors({ invalidLogin: true }); }
    if (login) {
      const redirect = this.route.snapshot.queryParamMap.get('redirect');
      this.router.navigate([redirect || '/']);
    }
  }
}
