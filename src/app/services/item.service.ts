import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/Item';

@Injectable()
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public something: AngularFirestore) {
    // this.items = this.something.collection('items').valueChanges();   this won't be able to get id of each item
    // snapshotChanges can get each item id showing
    // ref => ref.orderBy('title', 'asc') will be helping order the items that is created at first by ordering

    this.itemsCollection = this.something.collection('items', ref => ref.orderBy('title', 'asc'));

    this.items = this.itemsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

   getItems() {
     return this.items;
   }

   addItem(item: Item) {
     this.itemsCollection.add(item);
   }

   updateItem(item: Item) {
     this.itemDoc = this.something.doc(`items/${item.id}`);
     this.itemDoc.update(item);
   }

   deleteItem(item: Item) {
     this.itemDoc = this.something.doc(`items/${item.id}`);
     this.itemDoc.delete();
   }
}
