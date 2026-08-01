import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsApiService } from '../../../../services/post.service';
import { ReactionsService } from '../../../../services/reactions.service';
import { IComment } from '../../../../interfaces/i-comment';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit {
  postId: any = this.activatedRoute.snapshot.paramMap.get('id');
  post: any;
  comments: IComment[] = [];
  userFromLocalStorage: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.userFromLocalStorage);
  categories: any;
  users_reaction: any;
  currentReaction: string | null = null;

  constructor(
    private postsApiService: PostsApiService,
    private reactionsService: ReactionsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getPost(Number(this.postId));
  }

  getPost(id: number): void {
    this.postsApiService.getSinglePost(id).subscribe({
      next: (data) => {
        this.post = data;
        this.comments = this.post.comments;
        this.users_reaction = this.post.users_reaction;
        if (this.users_reaction?.like) {
          this.currentReaction = 'like'
        } else if (this.users_reaction.heart) {
          this.currentReaction = 'heart'
        } else if (this.users_reaction.happy) {
          this.currentReaction = 'happy'
        } else if (this.users_reaction.sad) {
          this.currentReaction = 'sad'
        } else {
          this.currentReaction = 'fire'
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addReaction(reactable_id: number, user_id: number, reactable_type: string, type: string): void {
    this.reactionsService.addReaction({ reactable_id, user_id, reactable_type, type }).subscribe({
      next: (data) => {
        this.getPost(Number(this.postId));
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  changeReaction(type: string): void {
    this.currentReaction = type;
  }

}
