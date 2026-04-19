import { User } from '@/app/core/models';
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@angular/fire/firestore';

export const UserConverter: FirestoreDataConverter<User> = {
  toFirestore: function (modelObject: WithFieldValue<User>): WithFieldValue<DocumentData> {
    return {
      id: modelObject.id,
      name: modelObject.name,
      email: modelObject.email,
      photoURL: modelObject.photoURL,
      createdAt: modelObject.createdAt,
      expireOn: modelObject.expireOn,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options?: SnapshotOptions,
  ): User {
    const data = snapshot.data(options);
    return {
      id: data['id'],
      name: data['name'],
      email: data['email'],
      photoURL: data['photoURL'],
      createdAt: data['createdAt'].toDate(),
      expireOn: data['expireOn'].toDate(),
    };
  },
};
