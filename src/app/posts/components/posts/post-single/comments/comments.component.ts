import { Component, OnInit } from '@angular/core';
import { ReactionsService } from '../../../../../services/reactions.service';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../../../../../services/comments.service';
import { AuthService } from '../../../../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {

  comments: any;
  postId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  userFromLocalStorage: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.userFromLocalStorage);
  author: any;
  activeMenuCommentId: number | null = null;
  reaction: any;
  buttonName: string = "Comment";

  constructor(private reactionsService: ReactionsService, private activatedRoute: ActivatedRoute, private commentsService: CommentsService, private authService: AuthService) { }


  ngOnInit() {
    this.getCommentsByPostId(this.postId)
    this.authService.runValidation(this.formCommentGroup);

  }

  OnEventEmitt(): void {
    this.getCommentsByPostId(this.postId);
  }

  formCommentGroup: any = new FormGroup({
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });

  postComment(body: string, user_id: any, post_id: any): void {
    this.reactionsService.addComment({ body, user_id, post_id }).subscribe({
      next: (data) => {
        this.formCommentGroup.get('body')?.reset();
        this.getCommentsByPostId(this.postId)
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addReaction(reactable_id: number, user_id: number, reactable_type: string, type: string): void {
    this.reactionsService.addReaction({ reactable_id, user_id, reactable_type, type }).subscribe({
      next: (data) => {
        this.reaction = data;
        this.getCommentsByPostId(this.postId)
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  toggleMenu(commentId: number): void {
    if (this.activeMenuCommentId === commentId) {
      // Close the menu if it's already open
      this.activeMenuCommentId = null;
    } else {
      // Open the clicked comment's menu
      this.activeMenuCommentId = commentId;
    }
  }

  getCommentsByPostId(postId: number): void {
    this.commentsService.getCommentsByPostId(postId).subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeComment(commentId: number): void {
    this.commentsService.removeComment(commentId).subscribe({
      next: (data) => {
        this.getCommentsByPostId(this.postId)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
