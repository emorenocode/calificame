import { Survey } from '@/app/core/models';
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@angular/fire/firestore';

export const SurveyConverter: FirestoreDataConverter<Survey> = {
  toFirestore: function (modelObject: WithFieldValue<Survey>): WithFieldValue<DocumentData> {
    return {
      ...modelObject,
      id: undefined,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options?: SnapshotOptions,
  ): Survey {
    const data = snapshot.data();
    return {
      ...data,
      id: snapshot.id,
      createdAt: data['createdAt'].toDate(),
      updatedAt: data['updatedAt'].toDate(),
    } as Survey;
  },
};
