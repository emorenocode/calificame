import { inject, Injectable, signal } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

interface User {
  name: string | null;
  email: string | null;
  photoURL: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly currentUser = signal<User | undefined>(undefined);

  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  async login() {
    const provide = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provide);
      const user: User = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      this.currentUser.set(user);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async logout() {
    await signOut(this.auth);
    this.currentUser.set(undefined);
    this.router.navigate(['/']);
  }
}
