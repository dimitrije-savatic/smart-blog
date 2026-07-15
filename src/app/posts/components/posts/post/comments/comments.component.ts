import { Component, OnInit } from '@angular/core';
import { ReactionsService } from '../../../../../services/reactions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {

  comments: any[] = []
  postId = this.activatedRoute.snapshot.paramMap.get('id')

  constructor(private reactionsService: ReactionsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getComments(Number(this.postId));
  }

  getComments(id: number): void{
    this.reactionsService.getCommentsByPost(id).subscribe({
      next: (data) =>{
        this.comments = data;
      }, 
      error: (err)=>{
        console.error(err);
      }
    })
  }
}
