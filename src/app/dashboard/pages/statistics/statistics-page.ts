import { UserService } from '@/app/shared/services/user-service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-statistics-page',
  imports: [],
  templateUrl: './statistics-page.html',
  styleUrl: './statistics-page.css',
})
export class StatisticsPage implements OnInit {
  protected readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly firestore = inject(Firestore);
  private currentUser = this.userService.currentUser();

  public readonly establishmentsList = signal<any[]>([]);
  public readonly currentEstablishment = signal<any | undefined>(undefined);

  ngOnInit(): void {
    this.getEstablishments();
  }

  getEstablishments() {
    from(
      getDocs(collection(this.firestore, 'user', this.currentUser!.id, 'establishments')),
    ).subscribe({
      next: (res) => {
        console.log('Res ', res);
        if (res.empty) {
          this.router.navigate(['/dashboard/establishments']);
          return;
        }

        res.docs.forEach((doc) => {
          console.log('Doc => ', doc.id, ' - ', doc.data());
          const establishment = {
            ...doc.data(),
            id: doc.id,
          };
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
