import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{

  location: string = '/contact';

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
  
  constructor(private emailService: EmailService){}

  ngOnInit(): void {
    this.runValidation();
  }

  emailForm: any = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(255)])
  });

  runValidation(): void {
    Object.keys(this.emailForm.controls).forEach((ctrlName) => {
      this.emailForm.get(ctrlName).markAsTouched();
    });
  }

  onSumbit(): void{
    this.emailService.sendEmail(this.emailForm.value).subscribe({
      next: (data)=>{
        this.bodySuccess = data.message
        this.success = true;
        console.log('Email sent successfully', data);
      },
      error: (err)=>{
        this.bodyError = err.message
        this.error = true;
        console.error(err);
        
      }
    })
  }
}
