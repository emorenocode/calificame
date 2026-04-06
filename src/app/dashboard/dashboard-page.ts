import { UserService } from '@/app/shared/services/user-service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { from, map, tap } from 'rxjs';
import { collection, doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard-page',
  imports: [Navbar, RouterOutlet],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  protected readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly firestore = inject(Firestore);
  private currentUser = this.userService.currentUser();

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userRef = doc(this.firestore, 'user', this.currentUser!.id);
    from(getDoc(userRef)).subscribe({
      next: (doc) => {
        const user = doc.data();
        console.log('User ', user);

        if (!user) return;

        const userStores = user['stores'];
        console.log('UserStores ', userStores);

        if (!userStores || userStores.length === 0) {
          this.router.navigate(['/dashboard/stores'], { queryParams: { action: 'add' } });
        }
      },
      error: (err) => {
        console.error('Error to get user: ', err);
      },
    });
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
