import { Injectable } from '@angular/core';

import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference
} from '@angular/fire/firestore';

import { Queing as modelClass } from './queing';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

const collection = 'queings';

@Injectable({
  providedIn: 'root'
})
export class QueingService {

  constructor(
    private afs: AngularFirestore
  ) { }

  private defaultCollection(): AngularFirestoreCollection<modelClass> {
    return this.afs.collection<modelClass>(collection);
  }

  private fetchData(col: AngularFirestoreCollection): Observable<any> {
    return col.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  get(): Observable<modelClass[]> {
    return this.fetchData(this.defaultCollection());
  }

  getOne(id: string): Observable<modelClass> {
    return this.defaultCollection().doc<modelClass>(id).valueChanges().pipe(
      take(1),
      map(data => {
        data.id = id;
        return data;
      })
    );
  }

  insert(data: any): Promise<DocumentReference> {
    return this.defaultCollection().add(data);
  }

  update(data: any): Promise<void> {
    return this.defaultCollection().doc(data.id).update({
      title: data.title,
      description: data.description
    });
  }

  delete(id: string): Promise<void> {
    return this.defaultCollection().doc(id).delete();
  }

}
