import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent implements OnInit {
  categories: any;

  constructor(private postService: PostService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.runValidation(this.formCreateCategory);
    this.getCategories();
  }

  getCategories(): void {
    this.postService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  createCategory(name: string): void {
    this.postService.createCategories({ name }).subscribe({
      next: () => {
        this.formCreateCategory.reset();
        this.notificationService.show('Category created successfully.', 'success');
      },
      error: (err) => {
        this.notificationService.show(err.error.error?.message, 'error');
        console.log(err);
      },
    });
  }

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
