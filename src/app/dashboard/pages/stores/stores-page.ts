import { UserService } from '@/app/shared/services/user-service';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { from } from 'rxjs';

interface Establishment {
  name: string;
  address: string;
  placeId: string;
}

@Component({
  selector: 'app-stores-page',
  imports: [DialogModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './stores-page.html',
  styleUrl: './stores-page.css',
})
export class StoresPage implements OnInit {
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
          this.showDialogAddEstablishment = true;
          this.chengeDetectRef.detectChanges();
          return;
        }

        res.forEach((doc) => {
          console.log(doc.data());
          const establishment = doc.data() as Establishment;
          this.establishmentList.update((list) => [...list, establishment]);
        });
      },
    });
  }

  onSaveEstablishment() {
    const newEstablishment = {
      ...(this.formGroup.value as unknown as Establishment),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const userCollRef = collection(this.firestore, 'user', this.currentUser!.id, 'establishments');
    from(addDoc(userCollRef, newEstablishment)).subscribe({
      next: (res) => {
        console.log('Res ', res);
        this.showDialogAddEstablishment = false;
        this.formGroup.reset();
        this.establishmentList.update((list) => [...list, newEstablishment]);
      },
    });
  }
}
