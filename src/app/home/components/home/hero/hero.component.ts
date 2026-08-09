import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { IPost } from '../../../../interfaces/i-post';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
  constructor(public postService: PostService) { }


  latestPosts: IPost[] = []

  ngOnInit(): void {
    this.getLatestPosts();
  }

  getLatestPosts(): void {
    this.postService.getLatestPosts().subscribe({
      next: (posts: IPost[]) => {
        this.latestPosts = posts;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }
}
