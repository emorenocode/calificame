import { UserService } from '@/app/shared/services/user-service';
import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [NgOptimizedImage],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
  protected userService = inject(UserService);
  protected username = signal<string | undefined>(undefined);

  onErrorLoadingImg() {
    const arrayName = this.userService.currentUser()?.name?.split(' ');
    if (arrayName) {
      if (arrayName?.length >= 2) {
        this.username.set(`${arrayName[0][0].toUpperCase()}${arrayName[1][0].toUpperCase()}`);
      } else {
        this.username.set(`${arrayName[0][0].toUpperCase()}`);
      }
    }
  }
}
