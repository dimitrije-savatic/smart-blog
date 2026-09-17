import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NotificationService } from '../../../../services/notification.service';
import { AuthService } from '../../../../services/auth.service';
import { IUser } from '../../../../interfaces/i-user';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  user: IUser
  categories: any;
  successMessage: string = "Post created successfully."


  constructor(private postService: PostService, private notificationService: NotificationService, private authService: AuthService) {
    this.user = this.authService.getUser()
  }

  ngOnInit(): void {
    this.runValidation(this.formCreatePost);
    this.getCategories();
  }

  getCategories(): void {
    this.postService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.formCreatePost.setControl(
          'category',
          new FormArray(
            this.categories.map(() => new FormControl(false, { nonNullable: true }))
          )
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  createPost() {
    if (this.formCreatePost.invalid) {
      return;
    }

    const selectedCategoryIds = this.categories
      .filter((cat: any, index: any) => this.categoryControls.at(index).value)
      .map((cat: any) => cat.id);

    const post = {
      title: this.formCreatePost.value.title,
      body: this.formCreatePost.value.body,
      category_ids: selectedCategoryIds,
      user_id: this.user.id
    };

    this.postService.createPost(post).subscribe({
      next: () => {
        this.formCreatePost.reset();
        this.notificationService.show(this.successMessage, "success", 2000)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  formCreatePost: any = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    body: new FormControl('', [Validators.required, Validators.minLength(10)]),
    category: new FormArray<FormControl<boolean>>([])
  });

  get categoryControls(): FormArray<FormControl<boolean>> {
    return this.formCreatePost.get('category') as FormArray<FormControl<boolean>>;
  }

  runValidation(formCreate: any): void {
    Object.keys(formCreate.controls).forEach((ctrlName) => {
      formCreate.get(ctrlName).markAsTouched();
    });
  }
}
