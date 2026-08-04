import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsApiService } from '../../../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../services/notification.service';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit {
  postId: any = this.activatedRoute.snapshot.paramMap.get('id');
  post: any;
  categories: any;

  ngOnInit(): void {
    this.runValidation(this.formEditPost);
    this.getPost(Number(this.postId));
    this.getCategories();
  }

  constructor(
    private postsApiService: PostsApiService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  getPost(id: number): void {
    this.postsApiService.getSinglePost(id).subscribe({
      next: (data) => {
        this.formEditPost.patchValue({
          title: data.title,
          body: data.body,
          category: data.categories.map((c: any) => c.id)
        });
        this.post = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCategories(): void {
    this.postsApiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updatePost(title: string, body: string, user_id: number, category: number[]): void {
    this.postsApiService.updatePost({ title, body, user_id, category_ids: category }, Number(this.postId)).subscribe({
      next: (data) => {
        this.notificationService.show('Post updated successfully.', 'success');
        this.getPost(Number(this.postId));
      },
      error: (err) => {
        this.notificationService.show(err.error.error?.message, 'error');
        console.error(err);
      },
    });
  }

  formEditPost: any = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(535),
    ]),
    category: new FormControl([], Validators.required),
  });

  runValidation(formEdit: any): void {
    Object.keys(formEdit.controls).forEach((ctrlName) => {
      formEdit.get(ctrlName).markAsTouched();
    });
  }

  isSelected(id: number): boolean {
    return this.formEditPost.value.category.includes(id);
  }

  onCategoryChange(checked: boolean, id: number): void {
    const control = this.formEditPost.get('category') as FormControl<number[]>;
    const values = [...control.value];

    if (checked) {
      if (!values.includes(id)) {
        values.push(id);
      }
    } else {
      const index = values.indexOf(id);
      if (index > -1) {
        values.splice(index, 1);
      }
    }

    control.setValue(values);
  }

}
