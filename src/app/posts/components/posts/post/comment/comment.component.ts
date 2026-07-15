import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';
import { UserService } from '../../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../../../../../services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  postId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  user = this.userService.getUser();

  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.runValidation(this.formCommentGroup);
  }

  formCommentGroup: any = new FormGroup({
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
  });

  postComment(body: string, user_id: any, post_id: any): void {
    this.commentsService.postComment({ body, user_id, post_id }).subscribe({
      next: (data) => {
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
