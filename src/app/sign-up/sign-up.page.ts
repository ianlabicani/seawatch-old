import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

  constructor() {
    this.form = this.fb.group({
      email: [],
      password: [],
      confirmPassword: [],
    });
  }

  get isPasswordMatch() {
    return (
      this.form.get('password')?.value ==
      this.form.get('confirmPassword')?.value
    );
  }

  onSubmit() {
    if (!this.isPasswordMatch) {
      console.log("password don't match");
      return;
    }
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
