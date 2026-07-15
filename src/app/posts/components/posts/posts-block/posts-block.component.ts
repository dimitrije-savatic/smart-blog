import { Component, Input, OnInit } from '@angular/core';
import { PostsApiService } from '../../../../services/post.service';

@Component({
  selector: 'app-posts-block',
  templateUrl: './posts-block.component.html',
  styleUrl: './posts-block.component.css'
})
export class PostsBlockComponent implements OnInit {

  @Input() post: any

  categories: any

  constructor(private postsService: PostsApiService) { }

  ngOnInit(): void {
  }

}
