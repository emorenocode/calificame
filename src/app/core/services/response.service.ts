import { FirestoreService } from '@/app/core/services/firestore.service';
import { inject, Injectable } from '@angular/core';
import { Response } from '@/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  private readonly fs = inject(FirestoreService);

  constructor() {}

  submit(response: Omit<Response, 'id' | 'createdAt'>) {
    return this.fs.add(`responses`, {
      ...response,
      createdAt: new Date(),
    });
  }

  getByEstablishmentId(establishmentId: string) {
    return this.fs.col<Response>(`responses`);
  }

  getById(responseId: string) {
    return this.fs.getDoc<Response>(`responses/${responseId}`);
  }
}
