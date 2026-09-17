import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactionsService } from '../../../../../../services/reactions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.css'
})
export class CommentInputComponent {

  @Input() postId!: number;
  @Input() parentId: number | null = null;
  @Output() getCategoriesByPostEmit = new EventEmitter<number>();
  userFromLocalStorage: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.userFromLocalStorage);

  constructor(private reactionsService: ReactionsService) { }

  postComment(body: string, user_id: number, post_id: number, parent_id: number | null): void {
    this.reactionsService.addComment({ body, user_id, post_id, parent_id }).subscribe({
      next: (data) => {
        this.formCommentGroup.get('body')?.reset();
        this.getCategoriesByPostEmit.emit();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  formCommentGroup: any = new FormGroup({
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });

}
