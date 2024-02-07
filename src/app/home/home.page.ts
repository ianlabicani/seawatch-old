import { Component, inject } from '@angular/core';
import shared from '../shared';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [shared],
})
export class HomePage {
  afAuth = inject(AngularFireAuth);
  router = inject(Router);

  constructor() {}

  logOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
