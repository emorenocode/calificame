import { Component, inject } from '@angular/core';
import { Avatar } from '../avatar/avatar';
import { UserService } from '@/app/shared/services/user-service';

@Component({
  selector: 'app-navbar',
  imports: [Avatar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly userService = inject(UserService);

  onLogout() {
    this.userService.logout();
  }
}
