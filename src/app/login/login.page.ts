import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginPage {
  fb = inject(FormBuilder);
  afAuth = inject(AngularFireAuth);
  router = inject(Router);
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      email: [],
      password: [],
    });
  }

  onSubmit() {
    // console.log(this.form.value);
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    this.signIn(email, password);
  }

  async signIn(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
        this.router.navigate(['/home']);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
