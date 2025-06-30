import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsApiService } from '../../../../services/post.service';
import { UserService } from '../../../../services/user.service';
import { ReactionsService } from '../../../../services/reactions.service';
import { ILike } from '../../../../interfaces/i-like';
import { IDislike } from '../../../../interfaces/i-dislike';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit {
  postId: any = this.activatedRoute.snapshot.paramMap.get('id');
  post: any;
  userOfPost: any;
  userFromLocalStorage: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.userFromLocalStorage);
  categories: any;
  likes: ILike[] = [];
  dislikes: IDislike[] = [];
  isLiked: boolean = false;
  isDisliked: boolean = false;

  constructor(
    private postsApiService: PostsApiService,
    private userService: UserService,
    private reactionsService: ReactionsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getPost(Number(this.postId));
    this.getCategoriesByPost(Number(this.postId));
    this.getLikesByPost(Number(this.postId));
    this.getDislikesByPost(Number(this.postId));
  }

  getPost(id: number): void {
    this.postsApiService.getSinglePost(id).subscribe({
      next: (data) => {
        this.post = data;
        this.userOfPost = this.getUserOfPost(this.post.user_id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCategoriesByPost(id: number): void {
    this.postsApiService.getCategoriesByPost(id).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getUserOfPost(id: number): void {
    this.userService.getSingleUser(id).subscribe({
      next: (data) => {
        this.userOfPost = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  likePost(post_id: number, user_id: number): void {
    this.reactionsService.likePost({ post_id, user_id }).subscribe({
      next: (data) => {
        console.log('Liked.', data);
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getLikesByPost(id: number): void {
    this.reactionsService.getLikesByPost(id).subscribe({
      next: (data) => {
        this.likes = data;
        this.likes.forEach((like) => {
          if (like.user_id == this.parsedUser.id) {
            this.isLiked = true;
          }
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  dislikePost(post_id: number, user_id: number): void {
    this.reactionsService.dislikePost({ post_id, user_id }).subscribe({
      next: (data) => {
        console.log('Disliked.', data);
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getDislikesByPost(id: number): void {
    this.reactionsService.getDislikesByPost(id).subscribe({
      next: (data) => {
        this.dislikes = data;
        this.dislikes.forEach((dislike) => {
          if (dislike.user_id == this.parsedUser.id) {
            this.isDisliked = true;
          }
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
