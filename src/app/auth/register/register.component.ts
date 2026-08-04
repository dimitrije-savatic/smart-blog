import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  hide = true;

  ngOnInit(): void {
    this.runValidation();
  }

  form: any = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]),
    confPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    terms: new FormControl('', [Validators.requiredTrue]),
  });

  runValidation(): void {
    Object.keys(this.form.controls).forEach((ctrlName) => {
      this.form.get(ctrlName).markAsTouched();
    });
  }

  register(
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): void {
    this.authService
      .register({ username, first_name, last_name, email, password })
      .subscribe({
        next: (data) => {
          this.notificationService.show('Registration successful. Please log in.', 'success');
          this.router.navigate(['/auth/login']);
        }, error: (err) => {
          this.notificationService.show(err.error.error?.message, 'error');
          console.error(err);
        }
      });
  }

}
