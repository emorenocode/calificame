import { Injectable } from '@angular/core';
import { CLIENTS_RESPONSE_DATA_MOCK } from '@mocks/*';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  getClientConfig(clientId: string) {
    return of(CLIENTS_RESPONSE_DATA_MOCK[clientId]);
  }
}
