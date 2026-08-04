import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsApiService } from '../../../services/post.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent implements OnInit {
  userId: number = 0;
  categories: any;

  constructor(private postsService: PostsApiService, private notificationService: NotificationService) {
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

  createCategory(name: string): void {
    this.postsService.createCategories({ name }).subscribe({
      next: (data) => {
        this.notificationService.show('Category created successfully.', 'success');
      },
      error: (err) => {
        this.notificationService.show(err.error.error?.message, 'error');
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
