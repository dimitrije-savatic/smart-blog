import { Component, OnInit } from '@angular/core';
import { PostsApiService } from '../../../../services/post.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  userId: number = 0;
  categories: any;

  constructor(private postsService: PostsApiService, private notificationService: NotificationService) {
    this.getUserId();
  }

  ngOnInit(): void {
    this.runValidation(this.formCreatePost);
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
        this.notificationService.show('Post created successfully.', 'success');
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

  runValidation(formCreate: any): void {
    Object.keys(formCreate.controls).forEach((ctrlName) => {
      formCreate.get(ctrlName).markAsTouched();
    });
  }
}
