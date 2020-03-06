import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from '../sign-up/username.validators';
import { UsersService } from '../users.service';
import { User, UserAuthService } from '../services/user-auth.service';
import { ActivatedRoute } from '@angular/router';
import { PasswordValidators } from '../sign-up/password.validators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {// TODO: add route auth guard
  selectedAvatar = null;

  form = new FormGroup({
    general: new FormGroup({
      username: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[\w-|_]+$/)
      ], UsernameValidators.shouldBeUnique),
      bio: new FormControl(''),
      avatar: new FormControl(''),
      tags: new FormControl('')
    }),
    security: new FormGroup({
      password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/(?=.*[a-z])/gm),
          Validators.pattern(/(?=.*[A-Z])/gm),
          Validators.pattern(/(?=.*[0-9])/gm),
          Validators.pattern(/(?=.*[!@#$%^&*])/gm)
      ]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: PasswordValidators.passwordsShouldMatch }),
  });

  get general() { return this.form.get('general'); }
  get username() { return this.general.get('username'); }
  get bio() { return this.general.get('bio'); }
  get avatar() { return this.general.get('avatar'); }
  get tags() { return this.general.get('tags'); }

  get security() { return this.form.get('security'); }
  get password() { return this.general.get('password'); }
  get confirmPassword() { return this.general.get('confirmPassword'); }

  get profile() { return this.auth.user || {} as User; }

  constructor(
    private service: UsersService,
    private auth: UserAuthService,
    private route: ActivatedRoute) {}

  onFileSelected(event) {
    this.selectedAvatar = event.target.files[0];
  }

  async onSubmit() {
    const data = new FormData();
    data.append('avatar', this.selectedAvatar, this.selectedAvatar.name);
    await this.service.update(this.profile._id, this.profile);
  }
}
