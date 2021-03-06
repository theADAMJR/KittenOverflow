import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DataService {
  constructor(http: HttpClient, private auth: UserAuthService) {
    super(UsersService.getRoute(), http);
  }

  private static getRoute(route = '') {
    return `${environment.api}/users/${route}`;
  }

  update(id: string, newItem: any, extraOptions?: any) {
    return super.update(id, newItem, { ...extraOptions, headers: this.buildHeaders() });
  }

  follow(id: string) {
    return this.http.get(UsersService.getRoute(`${id}/follow`), { headers: this.buildHeaders() }).toPromise();
  }

  unfollow(id: string) {
    return this.http.get(UsersService.getRoute(`${id}/unfollow`), { headers: this.buildHeaders() }).toPromise();
  }

  avatarURL(id: string) {
    return `${environment.api}/users/${id}/avatar`;
  }

  uploadAvatar(avatar: File) {
    const headers = this.buildHeaders();
    return this.http
      .post(UsersService.getRoute(`upload-avatar`), { avatar }, { headers })
      .toPromise();
  }

  private buildHeaders() {
    return new HttpHeaders({ authorization: `${this.auth.token}` });
  }
}
