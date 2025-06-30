import { Component, Input, OnInit } from '@angular/core';
import { PostsApiService } from '../../../../services/post.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit{
  constructor(public postsApiService: PostsApiService){}

  @Input() posts!: any[]

  ngOnInit(): void {
    
  }

  
}
