import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { CLIENTS_RESPONSE_DATA_MOCK } from '@mocks';
import { from, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  private readonly firestore = inject(Firestore);

  getClientConfig(clientId: string) {
    // return of(CLIENTS_RESPONSE_DATA_MOCK[clientId]);
    const questionRef = doc(this.firestore, 'question', clientId);
    return from(getDoc(questionRef)).pipe(
      tap((res) => {
        console.log('Get Question => ', res.data());
      }),
      map((res) => res.data()),
    );
  }
}
