import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  FirestoreDataConverter,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  WhereFilterOp,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private readonly db = inject(Firestore);

  constructor() {}

  col<T>(
    path: string,
    q?: { fieldPath: string; opStr: WhereFilterOp; value: any },
    converter?: FirestoreDataConverter<T>,
  ): Observable<T[]> {
    const ref = collection(this.db, path);

    if (q) {
      const queryRef = query(ref, where(q.fieldPath, q.opStr, q.value));
      if (converter) {
        queryRef.withConverter(converter);
      }
      return from(getDocs(queryRef)).pipe(
        map((querySnapshot) => {
          const data: T[] = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id } as T);
          });
          return data;
        }),
      );
    }

    if (converter) {
      ref.withConverter(converter);
    }

    return from(getDocs(ref)).pipe(
      map((querySnapshot) => {
        const data: T[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id } as T);
        });
        return data;
      }),
    );
  }

  async getDoc<T>(path: string) {
    const ref = this.getDocRef(path);
    const snap = await getDoc(ref);
    return snap.data() as T;
  }

  add<T>(path: string, data: any, converter?: FirestoreDataConverter<T>): Observable<any> {
    const ref = collection(this.db, path);
    if (converter) {
      ref.withConverter(converter);
    }
    return from(addDoc(ref, data));
  }

  updateDoc(path: string, data: any): Observable<any> {
    const ref = this.getDocRef(path);
    return from(updateDoc(ref, data));
  }

  getDocRef(path: string) {
    return doc(this.db, path);
  }

  getDocByQuery<T>(
    path: string,
    docId: string,
    q: { fieldPath: string; opStr: WhereFilterOp; value: any },
    converter?: FirestoreDataConverter<T>,
  ): Observable<T | null> {
    let colRef = collection(this.db, path);

    if (converter) {
      colRef = colRef.withConverter(converter as any);
    }

    const queryRef = query(
      colRef,
      where('__name__', '==', docId),
      where(q.fieldPath, q.opStr, q.value),
    );
    return from(getDocs(queryRef)).pipe(
      map((querySnapshot) => {
        if (querySnapshot.empty) {
          return null;
        }

        const doc = querySnapshot.docs[0];
        return { ...doc.data(), id: doc.id } as T;
      }),
    );
  }
}
