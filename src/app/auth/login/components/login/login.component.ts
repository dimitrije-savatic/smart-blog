import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router){
  }

  hide = true;
  error: boolean = false;
  notification: string = 'Login error';
  body: string = 'Something went wrong. Try again.'
  borderColor: string = '#F44336';
  buttonColor: string = '#F44336';
  location: string = '';
  

  form: any = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  })

  ngOnInit(): void {
    this.runValidation();
  }

  runValidation(): void{
    Object.keys(this.form.controls).forEach(ctrlName =>{
      this.form.get(ctrlName).markAsTouched()
    })
  }

  login(email: string, password:string){
    this.authService.login({email,password}).subscribe({
        next: (data) => { 
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.replace('/home');
        },
        error: (err) => {
          this.error = true;
          this.location = 'auth/login';
          console.error(err);
        }
      }
    );
  }
}