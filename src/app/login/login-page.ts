import { UserService } from '@/app/shared/services/user-service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly userService = inject(UserService);

  onLogin() {
    this.userService.login();
  }
}
