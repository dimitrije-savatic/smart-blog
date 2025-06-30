import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';
import { UserService } from '../../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ReactionsService } from '../../../../../services/reactions.service';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.css',
})
export class CommentInputComponent implements OnInit {
  postId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  user = this.userService.getUser();

  constructor(
    private reactionsService: ReactionsService,
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
      Validators.maxLength(255),
    ]),
  });

  postComment(body: string, user_id: any, post_id: any): void {
    this.reactionsService.postComment({ body, user_id, post_id }).subscribe({
      next: (data) => {
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
