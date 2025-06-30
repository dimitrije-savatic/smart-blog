import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  
  hide = true;
  location: string = ''

  // Error registration modal
  error: boolean = false;
  notificationError: string = 'Registration failed'
  bodyError: string = 'Something went wrong. try again.'
  borderColorError: string = '#F44336'
  buttonColorError: string = '#F44336'

  // Successfull registration modal
  success: boolean = false;
  notificationSuccess: string = 'Successfull registration'
  bodySuccess: string = 'You have registered successfully.'
  borderColorSuccess: string = '#22C55E'
  buttonColorSuccess: string = '#22C55E'
  
  ngOnInit(): void {
    this.runValidation();
  }

  form: any = new FormGroup({
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
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): void {
    this.authService
      .register({ first_name, last_name, email, password })
      .subscribe({
        next: (data) =>{
          this.success = true;
          this.location = '/auth/login';
          console.log('User added successfully!', data);
        },error: (err)=>{
          this.error = true;
          this.location = '/auth/register';
          console.error(err);
        }
      });
  }

}
