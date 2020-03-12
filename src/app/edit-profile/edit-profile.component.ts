import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import UsernameGenerator from 'username-generator';
import { TagsService } from '../services/tags.service';
import { User, UserAuthService } from '../services/user-auth.service';
import { UsersService } from '../services/users.service';
import { PasswordValidators } from '../sign-up/password.validators';
import { UsernameValidators } from '../sign-up/username.validators';
import { Tag } from '../tags/tags.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {// TODO: add route auth guard
  selectedAvatar: File;
  allTags: Tag[];

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
  get security() { return this.form.get('security'); }

  get username() { return this.general.get('username'); }
  get bio() { return this.general.get('bio'); }
  get avatar() { return this.general.get('avatar'); }
  get tags() { return this.general.get('tags'); }

  get password() { return this.security.get('password'); }
  get confirmPassword() { return this.security.get('confirmPassword'); }

  get profile() { return this.auth.user || {} as User; }

  constructor(
    private service: UsersService,
    private auth: UserAuthService,
    private tagsService: TagsService) {}

  async ngOnInit() {
    this.allTags = await this.tagsService.get() as Tag[];
  }

  generateUsername() {
    this.username.setValue(UsernameGenerator.generateUsername('-'));
  }

  onFileSelected(event: any) {
    this.selectedAvatar = event.target.files[0];
  }

  async onSubmit(form: any) {
    // if (this.form.invalid) {
    //   return;
    // }
    // await this.service.update(this.profile._id, this.toUser());
    await this.service.uploadAvatar(this.selectedAvatar);
  }

  private toUser() {
    const user = this.profile;
    user.username = this.username.value;
    user.bio = this.bio.value;
    user.tags = this.tags.value;
    user.password = this.password.value;
    return user;
  }
}
