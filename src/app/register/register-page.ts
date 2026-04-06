import { UserService } from '@/app/shared/services/user-service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-register-page',
  imports: [],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  protected readonly userService = inject(UserService);

  registerWithGoogle() {
    this.userService.login();
  }
}
