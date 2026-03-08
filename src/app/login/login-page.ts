import { UserService } from '@/app/shared/services/user-service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  onLogin() {
    this.userService.login();
    this.router.navigate(['/dashboard']);
  }
}
