import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterModule } from '@angular/router';

import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';
import { FirebaseError } from '@angular/fire/app';

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
  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email must be a valid email address.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 6 characters long.',
      },
    ],
  };
  submitError = '';

  constructor() {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    addIcons({ informationCircleOutline });
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
      this.submitError = (error as unknown as FirebaseError).message;
      console.log(error);
    }
  }
}
