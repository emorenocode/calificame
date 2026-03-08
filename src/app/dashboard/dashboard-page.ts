import { UserService } from '@/app/shared/services/user-service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
