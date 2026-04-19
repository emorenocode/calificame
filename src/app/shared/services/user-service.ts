import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { User } from '@/app/core/models';
import { UserConverter } from '@/app/core/converters/user.converter';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly currentUser = signal<User | undefined>(undefined);

  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly firestore = inject(Firestore);

  async login() {
    const provide = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provide);
      const userGoogle = result.user;
      if (!userGoogle) {
        throw new Error('No user information found after login.');
      }

      const userRef = doc(this.firestore, 'user', userGoogle.uid).withConverter(UserConverter);
      const userFromDB = (await getDoc(userRef)).data();

      if (userFromDB) {
        this.currentUser.set({ ...userFromDB, photoURL: userGoogle.photoURL });
      } else {
        const user: User = {
          id: userGoogle.uid,
          name: userGoogle.displayName,
          email: userGoogle.email,
          photoURL: userGoogle.photoURL,
          createdAt: null,
          expireOn: null,
        };
        const newUser = await this.createUser(user);
        this.currentUser.set(newUser);
      }

      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async createUser(user: User) {
    const newUserRef = doc(this.firestore, 'users', user.id).withConverter(UserConverter);
    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
    const createdAt = new Date();
    const expireOn = new Date(createdAt.getTime() + oneMonthInMs);
    const newUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
      createdAt,
      expireOn,
    };

    await setDoc(newUserRef, newUser);
    return newUser;
  }

  async logout() {
    await signOut(this.auth);
    this.currentUser.set(undefined);
    this.router.navigate(['/']);
  }
}
