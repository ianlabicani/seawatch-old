import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';

export interface Item {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('users');
    this.items = this.itemsCollection.valueChanges();
  }
  ngOnInit(): void {
    this.items.subscribe({
      next: (data) => {
        console.log('data', data);
      },
    });
  }
  addItem(item: Item) {
    this.itemsCollection.add(item);
  }
}
