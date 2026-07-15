import { Component, Input, OnInit } from '@angular/core';
import { PostsApiService } from '../../../../services/post.service';
import { IPost } from '../../../../interfaces/i-post';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
  constructor(public postsApiService: PostsApiService) { }


  @Input() posts!: IPost[]
  latestPosts: IPost[] = []

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.getLatestPosts();
  }

  getLatestPosts(): IPost[] {
    this.latestPosts = this.posts.slice(-3).reverse();
    return this.latestPosts;
  }
}
