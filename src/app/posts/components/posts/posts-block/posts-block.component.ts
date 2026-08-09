import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-block',
  templateUrl: './posts-block.component.html',
  styleUrl: './posts-block.component.css'
})
export class PostsBlockComponent implements OnInit {

  @Input() post: any

  categories: any

  constructor() { }

  ngOnInit(): void {
  }

}
