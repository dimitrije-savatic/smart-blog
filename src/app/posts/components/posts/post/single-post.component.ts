import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsApiService } from '../../../../services/post.service';
import { UserService } from '../../../../services/user.service';
import { ReactionsService } from '../../../../services/reactions.service';
import { IReaction } from '../../../../interfaces/i-reaction';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit {
  postId: any = this.activatedRoute.snapshot.paramMap.get('id');
  post: any;
  userFromLocalStorage: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.userFromLocalStorage);
  categories: any;
  reactions: IReaction[] = [];
  isReacted: boolean = false;

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
        this.post.reaction_counts.like > 0 ? (this.isReacted = true) : (this.isReacted = false);
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

}
