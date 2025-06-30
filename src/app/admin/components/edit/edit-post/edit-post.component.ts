import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsApiService } from '../../../../services/post.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit {
  postId: any = this.activatedRoute.snapshot.paramMap.get('id');
  post: any;
  categories: any;
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
    this.runValidation(this.formEditPost);
    this.getPost(Number(this.postId));
    this.getCategoriesByPost(this.postId);
  }

  constructor(
    private postsApiService: PostsApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  getPost(id: number): void {
    this.postsApiService.getSinglePost(id).subscribe({
      next: (data) => {
        this.formEditPost.patchValue({
          title: data.title,
          body: data.body,
        });
        this.post = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCategoriesByPost(id: number): void{
    this.postsApiService.getCategoriesByPost(id).subscribe({
      next: (data)=>{
        this.categories = data;
      },
      error: (err)=>{
        console.error(err);
      }
    })
  }

  updatePost(id: number, title: string, body: string, user_id: number): void {
    this.postsApiService.updatePost({ id, title, body, user_id }).subscribe({
      next: (data) => {
        this.success = true;
        this.location = '/admin'
        this.bodySuccess = data.message
        
      },
      error: (err) => {
        this.error = true;
        this.location = ''
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
    category: new FormControl([true], [Validators.requiredTrue]),
  });

  runValidation(formEdit: any): void {
    Object.keys(formEdit.controls).forEach((ctrlName) => {
      formEdit.get(ctrlName).markAsTouched();
    });
  }

}
