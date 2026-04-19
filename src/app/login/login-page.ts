import { UserService } from '@/app/shared/services/user-service';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly userService = inject(UserService);
  protected readonly isLoading = signal(false);

  loginWithGoogle() {
    this.isLoading.set(true);
    this.userService.login().finally(() => {
      this.isLoading.set(false);
    });
  }
}
