import { Component, Input, OnInit } from '@angular/core';
import { PostsApiService } from '../../../../services/post.service';

@Component({
  selector: 'app-posts-block',
  templateUrl: './posts-block.component.html',
  styleUrl: './posts-block.component.css'
})
export class PostsBlockComponent implements OnInit{

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
