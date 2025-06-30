import { Component, Input, OnInit } from '@angular/core';
import { PostsApiService } from '../../../../../services/post.service';

@Component({
  selector: 'app-news-block',
  templateUrl: './news-block.component.html',
  styleUrl: './news-block.component.css'
})
export class NewsBlockComponent implements OnInit{

  @Input() post: any
  categories: any

  constructor(private postsService: PostsApiService){}

  ngOnInit(): void {
    this.getCategoriesByPost(Number(this.post.id));
  }

  getCategoriesByPost(id: any): void {
    this.postsService.getCategoriesByPost(id).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
