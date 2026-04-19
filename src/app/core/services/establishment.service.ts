import { EstablishmentConverter } from '@/app/core/converters';
import { Establishment } from '@/app/core/models';
import { FirestoreService } from '@/app/core/services/firestore.service';
import { inject, Injectable } from '@angular/core';
import { collection, collectionData, query, where } from '@angular/fire/firestore';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  private readonly fs = inject(FirestoreService);

  constructor() {}

  create(establishment: Establishment) {
    return from(this.fs.add('establishments', establishment));
  }

  getAll() {
    return this.fs.col<Establishment>('establishments');
  }

  getById(id: string) {
    return from(this.fs.getDoc<Establishment>(`establishments/${id}`));
  }

  getByOwnerId(ownerId: string) {
    const ref = collection(this.fs['db'], 'establishments').withConverter(EstablishmentConverter);
    const q = query(ref, where('ownerId', '==', ownerId));

    return collectionData(q, { idField: 'id' }).pipe(
      map((querySnapshot) => {
        const establishments: Establishment[] = [];
        console.log('Query Snapshot => ', querySnapshot);
        querySnapshot.forEach((doc) => {
          establishments.push({ ...doc } as Establishment);
        });
        return establishments;
      }),
    );
  }
}
