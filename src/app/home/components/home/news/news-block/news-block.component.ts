import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-block',
  templateUrl: './news-block.component.html',
  styleUrl: './news-block.component.css'
})
export class NewsBlockComponent {

  @Input() post: any
  categories: any

  constructor() { }

}
