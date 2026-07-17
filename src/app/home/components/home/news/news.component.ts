import { Component, Input, OnChanges } from '@angular/core';
import { PostsApiService } from '../../../../services/post.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnChanges {
  constructor(public postsApiService: PostsApiService) { }

  @Input() posts!: any[]
  lastSevenPosts: any[] = []
  newsButtonTitle: string = 'View All'
  description: string = 'Check out our most famous stories.'

  ngOnChanges(): void {
    this.lastSevenPosts = this.posts.slice(-7).reverse();
  }




}
