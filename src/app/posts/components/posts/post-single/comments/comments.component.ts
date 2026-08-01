import { Component, Input, OnInit } from '@angular/core';
import { ReactionsService } from '../../../../../services/reactions.service';
import { ActivatedRoute } from '@angular/router';
import { PostsApiService } from '../../../../../services/post.service';
import { CommentsService } from '../../../../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {

  comments: any;
  postId = this.activatedRoute.snapshot.paramMap.get('id')
  userFromLocalStorage: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.userFromLocalStorage);
  activeMenuCommentId: number | null = null;
  reaction: any;

  constructor(private reactionsService: ReactionsService, private postsApiService: PostsApiService, private activatedRoute: ActivatedRoute, private commentsService: CommentsService) { }


  ngOnInit() {
    this.getCommentsByPostId(Number(this.postId))
  }

  addReaction(reactable_id: number, user_id: number, reactable_type: string, type: string): void {
    this.reactionsService.addReaction({ reactable_id, user_id, reactable_type, type }).subscribe({
      next: (data) => {
        this.reaction = data;
        this.getCommentsByPostId(Number(this.postId))
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

}
