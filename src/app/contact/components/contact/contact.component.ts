import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../../services/email.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {


  constructor(private emailService: EmailService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.runValidation();
  }

  emailForm: any = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(255)])
  });

  runValidation(): void {
    Object.keys(this.emailForm.controls).forEach((ctrlName) => {
      this.emailForm.get(ctrlName).markAsTouched();
    });
  }

  onSumbit(): void {
    this.emailService.sendEmail(this.emailForm.value).subscribe({
      next: (data) => {
        this.notificationService.show('Email sent successfully.', 'success');
        console.log('Email sent successfully', data);
      },
      error: (err) => {
        this.notificationService.show(err.error.error?.message, 'error');
        console.error(err);

      }
    })
  }
}
