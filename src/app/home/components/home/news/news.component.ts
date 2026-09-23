import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnChanges {
  constructor() { }

  @Input() posts!: any[]
  lastEightPosts: any[] = []
  newsButtonTitle: string = 'View All'
  description: string = 'Discover the stories that have captured the most attention and sparked the greatest discussions.'

  ngOnChanges(): void {
    this.lastEightPosts = this.posts.slice(-8).reverse();
  }




}
