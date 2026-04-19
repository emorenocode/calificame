import { UserService } from '@/app/shared/services/user-service';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-register-page',
  imports: [],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  protected readonly isLoading = signal(false);
  protected readonly userService = inject(UserService);

  registerWithGoogle() {
    this.isLoading.set(true);
    this.userService.login().finally(() => {
      this.isLoading.set(false);
    });
  }
}
