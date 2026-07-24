import { Component, Input, OnInit } from '@angular/core';
import { ReactionsService } from '../../../../../services/reactions.service';
import { ActivatedRoute } from '@angular/router';
import { PostsApiService } from '../../../../../services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  @Input() post: any;
  postId = this.activatedRoute.snapshot.paramMap.get('id')
  userFromLocalStorage: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.userFromLocalStorage);
  activeMenuCommentId: number | null = null;
  reaction: any;

  constructor(private reactionsService: ReactionsService, private postsApiService: PostsApiService, private activatedRoute: ActivatedRoute) { }

  addReaction(reactable_id: number, user_id: number, reactable_type: string, type: string): void {
    this.reactionsService.addReaction({ reactable_id, user_id, reactable_type, type }).subscribe({
      next: (data) => {
        this.reaction = data;
        this.getPost(Number(this.postId))
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

  getPost(id: number): void {
    this.postsApiService.getSinglePost(id).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
