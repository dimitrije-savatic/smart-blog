import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsApiService } from '../../../services/post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  userId: number = 0;
  categories: any;
  location: string = '';

  // Error registration modal
  error: boolean = false;
  notificationError: string = 'Update failed';
  bodyError: string = 'Something went wrong. Try again';
  borderColorError: string = '#F44336';
  buttonColorError: string = '#F44336';

  // Successfull registration modal
  success: boolean = false;
  notificationSuccess: string = 'Successfull update';
  bodySuccess: string = '';
  borderColorSuccess: string = '#22C55E';
  buttonColorSuccess: string = '#22C55E';

  constructor(private postsService: PostsApiService) {
    this.getUserId();
  }

  ngOnInit(): void {
    this.runValidation(this.formCreatePost);
    this.runValidation(this.formCreateCategory);
    this.getCategories();
  }

  getUserId() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.userId = user.id;
    } else {
      console.log('User not found in local storage');
    }
  }

  getCategories(): void {
    this.postsService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  createPost(title: string, body: string, user_id: number): void {
    this.postsService.createPost({ title, body, user_id }).subscribe({
      next: (data) => {
        this.success = true;
        this.bodySuccess = data.message;
        this.location = '/admin';
      },
      error: (err) => {
        this.error = true;
        this.location = '';
        console.log(err);
      },
    });
  }

  createPostCategories(): void {
    
  }

  createCategory(name: string): void {
    this.postsService.createCategories({ name }).subscribe({
      next: (data) => {
        this.success = true;
        this.bodySuccess = data.message;
        this.location = '/admin';
      },
      error: (err) => {
        this.error = true;
        this.location = '';
        console.log(err);
      },
    });
  }

  formCreatePost: any = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    body: new FormControl('', [Validators.required, Validators.minLength(10)]),
    category: new FormControl('', [Validators.requiredTrue]),
  });

  formCreateCategory: any = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  runValidation(formCreate: any): void {
    Object.keys(formCreate.controls).forEach((ctrlName) => {
      formCreate.get(ctrlName).markAsTouched();
    });
  }
}
