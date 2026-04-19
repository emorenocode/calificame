import { Establishment } from '@/app/core/models';
import { EstablishmentService } from '@/app/core/services/establishment.service';
import { UserService } from '@/app/shared/services/user-service';
import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-statistics-page',
  imports: [DatePipe],
  templateUrl: './statistics-page.html',
  styleUrl: './statistics-page.css',
})
export class StatisticsPage implements OnInit {
  protected readonly userService = inject(UserService);
  protected readonly currentUser = this.userService.currentUser();

  public readonly establishmentsList = signal<Establishment[]>([]);
  public readonly currentEstablishment = signal<Establishment | undefined>(undefined);
  public readonly establishmentService = inject(EstablishmentService);

  ngOnInit(): void {
    this.getEstablishments();
  }

  getEstablishments() {
    this.establishmentService.getByOwnerId(this.currentUser!.id).subscribe({
      next: (establishments: Establishment[]) => {
        if (establishments.length === 0) {
          return;
        }

        establishments.forEach((establishment) => {
          this.establishmentsList.update((list) => [...list, establishment]);
        });

        if (this.establishmentsList().length === 1) {
          const establishment = this.establishmentsList()[0];
          this.currentEstablishment.set(establishment);
        }
      },
    });
  }
}
