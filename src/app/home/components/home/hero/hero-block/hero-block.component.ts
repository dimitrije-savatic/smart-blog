import { Component, Input, OnInit } from '@angular/core';
import { ReactionsService } from '../../../../../services/reactions.service';
import { ILike } from '../../../../../interfaces/i-like';
import { IDislike } from '../../../../../interfaces/i-dislike';

@Component({
  selector: 'app-hero-block',
  templateUrl: './hero-block.component.html',
  styleUrl: './hero-block.component.css',
})
export class HeroBlockComponent implements OnInit {
  @Input() post: any;
  likes: ILike[] = [];
  dislikes: IDislike[] = [];

  constructor(private reactionsService: ReactionsService) {}

  ngOnInit(): void {
    this.getReactionsByPost(this.post.id);
  }

  getReactionsByPost(id: number): void {
    this.reactionsService.getLikesByPost(id).subscribe({
      next: (data) => {
        this.likes = data;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.reactionsService.getDislikesByPost(id).subscribe({
      next: (data) => {
        this.dislikes = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
