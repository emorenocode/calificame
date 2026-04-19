import { Establishment } from '@/app/core/models';
import { EstablishmentService } from '@/app/core/services/establishment.service';
import { UserService } from '@/app/shared/services/user-service';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-establishments-page',
  imports: [DialogModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './establishments-page.html',
  styleUrl: './establishments-page.css',
})
export class EstablishmentsPage {
  private readonly chengeDetectRef = inject(ChangeDetectorRef);
  private readonly currentUser = inject(UserService).currentUser();
  private readonly firestore = inject(Firestore);
  public showDialogAddEstablishment: boolean = false;
  public formGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    placeId: new FormControl(null, Validators.required),
  });
  establishmentList = signal<Establishment[]>([]);

  private readonly establishmentService = inject(EstablishmentService);

  ngOnInit(): void {
    this.getEstablishments();
  }

  getEstablishments() {
    this.establishmentService.getByOwnerId(this.currentUser!.id).subscribe({
      next: (establishments: Establishment[]) => {
        console.log('Establecimientos ', establishments);
        if (establishments.length === 0) {
          this.showDialogAddEstablishment = true;
          this.chengeDetectRef.detectChanges();
          return;
        }

        establishments.forEach((establishment) => {
          this.establishmentList.update((list) => [...list, establishment]);
        });
      },
    });
  }

  onSaveEstablishment() {
    const newEstablishment = {
      name: this.formGroup.get('name')?.value,
      address: this.formGroup.get('address')?.value,
      placeId: this.formGroup.get('placeId')?.value,
      ownerId: this.currentUser!.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      avgRating: 0,
      ratingSum: 0,
      totalReviews: 0,
      qrCodeUrl: '',
    } as unknown as Establishment;

    this.establishmentService.create(newEstablishment).subscribe({
      next: (res) => {
        console.log('Res ', res);
        this.showDialogAddEstablishment = false;
        this.formGroup.reset();
        this.establishmentList.update((list) => [...list, newEstablishment]);
      },
    });
  }
}
