import { inject, Injectable, signal } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

interface User {
  id: string;
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
  private readonly firestore = inject(Firestore);

  async login() {
    const provide = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provide);
      console.log('User ', result.user);
      const user: User = {
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      this.currentUser.set(user);

      const userRef = doc(this.firestore, 'user', user.id);
      const currentUser = (await getDoc(userRef)).data();

      if (!currentUser) {
        const newUserRef = doc(this.firestore, 'user', user.id);
        const createdAt = new Date();
        const expireOn = new Date(new Date().setDate(createdAt.getDate() + 30));

        await setDoc(newUserRef, {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt,
          expireOn,
        });
      }

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
