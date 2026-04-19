import { SurveyConverter } from '@/app/core/converters/survey.converter';
import { Survey } from '@/app/core/models/survey.model';
import { FirestoreService } from '@/app/core/services/firestore.service';
import { inject, Injectable } from '@angular/core';
import { increment, updateDoc } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private readonly fs = inject(FirestoreService);

  constructor() {}

  create(survey: Survey) {
    return this.fs.add(`surveys`, survey, SurveyConverter);
  }

  getByEstablishmentId(establishmentId: string) {
    return this.fs.col<Survey>(
      'surveys',
      {
        fieldPath: 'establishmentId',
        opStr: '==',
        value: establishmentId,
      },
      SurveyConverter,
    );
  }

  getById(surveyId: string) {
    return from(this.fs.getDoc<Survey>(`surveys/${surveyId}`));
  }

  sendScandalyticsEvent(surveyId: string) {
    const docRef = this.fs.getDocRef(`surveys/${surveyId}`);
    return from(updateDoc(docRef, { scanCount: increment(1) }));
  }
}
