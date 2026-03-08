import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly currentUser = signal<any>(undefined);

  login() {
    this.currentUser.set({
      username: 'HolaTest',
    });
  }

  logout() {
    this.currentUser.set(undefined);
  }
}
