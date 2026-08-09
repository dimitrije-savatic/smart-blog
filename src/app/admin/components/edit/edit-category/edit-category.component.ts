import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {


  categoryId: any = this.activatedRoute.snapshot.paramMap.get('id')
  category: any

  ngOnInit(): void {
    this.runValidation(this.formEditCategory);
    this.getCategory(Number(this.categoryId));
  }

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  formEditCategory: any = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
  });

  runValidation(formEdit: any): void {
    Object.keys(formEdit.controls).forEach((ctrlName) => {
      formEdit.get(ctrlName).markAsTouched();
    });
  }

  getCategory(id: number): void {
    this.postService.getSingleCategory(id).subscribe({
      next: (data) => {
        this.formEditCategory.patchValue({ name: data.name })
        this.category = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateCategory(id: number, name: string): void {
    this.postService.updateCategory({ name }, this.categoryId).subscribe({
      next: (data) => {
        this.notificationService.show('Category updated successfully.', 'success');
      },
      error: (err) => {
        this.notificationService.show(err.error.error?.message, 'error');
        console.error(err);
      }
    })
  }

}
