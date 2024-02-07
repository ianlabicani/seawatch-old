import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  afAuth = inject(AngularFireAuth);
  router = inject(Router);

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }
    return false;
  }
}
