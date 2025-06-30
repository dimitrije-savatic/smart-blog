import { Component, Input, OnInit, Output, output } from '@angular/core';
import { ReactionsService } from '../../../../../services/reactions.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {

  comments: any[] = []
  user: any
  postId = this.activatedRoute.snapshot.paramMap.get('id')
  constructor(private reactionsService: ReactionsService, private activatedRoute: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.getComments(Number(this.postId));

    if(this.userService.isLoggedIn()){
          this.user = this.userService.getUser();
        }else{
          console.log('User not logged in.');
        }
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
