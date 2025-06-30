import { Component, Input, OnInit } from '@angular/core';
import { PostsApiService } from '../../../../services/post.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{
  constructor(public postsApiService: PostsApiService){}

  @Input() posts!: any[]

  newsButtonTitle: string = 'View All'

  ngOnInit(): void {
  }

  

  
}
