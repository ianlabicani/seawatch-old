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
import { Router, RouterLink } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterLink],
})
export class SignUpPage {
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
    confirmPassword: [
      { type: 'required', message: 'Confirm Password is required.' },
      { type: 'mismatch', message: "Password doesn't match." },
    ],
  };
  submitError = '';

  constructor() {
    this.form = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
    addIcons({ informationCircleOutline });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value ===
      formGroup.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    this.signUp(email, password);
  }

  async signUp(email: string, password: string) {
    try {
      await this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.router.navigate(['/login']);
        });
    } catch (err) {
      console.log(err);
    }
  }
}
