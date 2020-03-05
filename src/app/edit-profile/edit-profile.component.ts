import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from '../sign-up/username.validators';
import { UsersService } from '../users.service';
import { User } from '../services/user-auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profile: User;
  selectedAvatar = null;

  form = new FormGroup(
  {
    username: new FormControl(
    [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[\w-|_]+$/)
    ], UsernameValidators.shouldBeUnique),
    bio: new FormControl('')
  });

  constructor(private service: UsersService) {}

  ngOnInit() {
    
  }

  onFileSelected(event) {
    this.selectedAvatar = event.target.files[0];
  }

  async onSubmit() {
    const data = new FormData();
    data.append('image', this.selectedAvatar, this.selectedAvatar.name);
    await this.service.update(this.profile._id, this.profile);
  }
}
