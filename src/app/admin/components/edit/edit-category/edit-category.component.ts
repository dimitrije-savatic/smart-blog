import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsApiService } from '../../../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {


  categoryId: any = this.activatedRoute.snapshot.paramMap.get('id')
  category: any
  location: string = ''

  // Error registration modal
  error: boolean = false;
  notificationError: string = 'Update failed'
  bodyError: string = 'Something went wrong. Try again'
  borderColorError: string = '#F44336'
  buttonColorError: string = '#F44336'

  // Successfull registration modal
  success: boolean = false;
  notificationSuccess: string = 'Successfull update'
  bodySuccess: string = ''
  borderColorSuccess: string = '#22C55E'
  buttonColorSuccess: string = '#22C55E'

  ngOnInit(): void {
    this.runValidation(this.formEditCategory);
    this.getCategory(Number(this.categoryId));
  }

  constructor(
    private postsApiService: PostsApiService,
    private activatedRoute: ActivatedRoute
  ) {}

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

  getCategory(id: number): void{
    this.postsApiService.getSingleCategory(id).subscribe({
      next: (data) => {
        this.formEditCategory.patchValue({name: data.name})
        this.category = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateCategory(id:number, name: string): void{
    this.postsApiService.updateCategory({id, name}).subscribe({
      next: (data) => {
        this.success = true;
        this.bodySuccess = data.message
        this.location = '/admin'
      },
      error: (err) =>{
        this.error = true
        this.location = ''
        console.error(err);
      }
    })
  }

}
