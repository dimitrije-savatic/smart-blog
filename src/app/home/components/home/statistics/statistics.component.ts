import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ReactionsService } from '../../../../services/reactions.service';

import { IUser } from '../../../../interfaces/i-user';
import { ILike } from '../../../../interfaces/i-like';
import { IDislike } from '../../../../interfaces/i-dislike';
import { IComment } from '../../../../interfaces/i-comment';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  description: string =
    "In the past month, our blog experienced a 30% increase in traffic, reaching over 5,000 views compared to the previous month's 3,500. Additionally, user engagement hit a new high with 2,000 likes and 100 new registered users, reflecting a growing interest in our content.";
  users: IUser[] = [];
  likes: ILike[] = [];
  dislikes: IDislike[] = [];
  comments: IComment[] = [];

  constructor(private userService: UserService, private reactionsService: ReactionsService) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) =>{
        console.error(err);
        
      }
    });

    this.reactionsService.getLikes().subscribe({
      next: (data) => {
        this.likes = data;
      },
      error: (err) =>{
        console.error(err);
        
      }
    });

    this.reactionsService.getDislikes().subscribe({
      next: (data) => {
        this.dislikes = data;
      },
      error: (err) =>{
        console.error(err);
        
      }
    });

    this.reactionsService.getComments().subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) =>{
        console.error(err);
        
      }
    });
  }
}
