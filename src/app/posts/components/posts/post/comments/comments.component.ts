import { Component, Input, OnInit } from '@angular/core';
import { ReactionsService } from '../../../../../services/reactions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {

  @Input() post: any;
  postId = this.activatedRoute.snapshot.paramMap.get('id')

  constructor(private reactionsService: ReactionsService, private activatedRoute: ActivatedRoute) { }



  ngOnInit(): void {
  }

  reactionTypes = [
    { type: 'like', icon: '👍' },
    { type: 'love', icon: '❤️' },
    { type: 'haha', icon: '😂' },
    { type: 'wow', icon: '😮' },
    { type: 'sad', icon: '😢' },
    { type: 'fire', icon: '🔥' },
  ];

  selectedReaction: string | null = null;

  selectReaction(type: string): void {

    if (this.selectedReaction === type) {
      // Remove reaction
      this.selectedReaction = null;
      // call API to remove reaction
      return;
    }

    // Add/change reaction
    this.selectedReaction = type;

    // call API
  }
}
