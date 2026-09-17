import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentsService } from '../../../../../../services/comments.service';
import { ReactionsService } from '../../../../../../services/reactions.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

  @Input() comment!: any
  @Input() postId!: number
  activeMenuCommentId: number | null = null;
  showReply = false;
  @Output() getCategoriesByPostEmit = new EventEmitter<number>();
  @Input() parsedUser!: any
  reaction: any

  constructor(private commentsService: CommentsService, private reactionsService: ReactionsService) { }

  toggleMenu(commentId: number): void {
    if (this.activeMenuCommentId === commentId) {
      this.activeMenuCommentId = null;
    } else {
      this.activeMenuCommentId = commentId;
    }
  }

  removeComment(commentId: number): void {
    this.commentsService.removeComment(commentId).subscribe({
      next: (data) => {
        this.getCategoriesByPostEmit.emit();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addReaction(reactable_id: number, user_id: number, reactable_type: string, type: string): void {
    this.reactionsService.addReaction({ reactable_id, user_id, reactable_type, type }).subscribe({
      next: (data) => {
        this.reaction = data;
        this.getCategoriesByPostEmit.emit();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}
