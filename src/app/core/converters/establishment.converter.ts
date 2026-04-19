import { Establishment } from '@/app/core/models';
import { FirestoreDataConverter } from '@angular/fire/firestore';

export const EstablishmentConverter: FirestoreDataConverter<Establishment> = {
  toFirestore(establishment: Establishment): any {
    return {
      ...establishment,
      id: undefined,
    };
  },
  fromFirestore(snapshot: any): Establishment {
    const data = snapshot.data();
    return {
      ...data,
      id: snapshot.id,
      createdAt: data['createdAt'].toDate(),
      updatedAt: data['updatedAt'].toDate(),
    } as Establishment;
  },
};
