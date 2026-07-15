import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ReactionsService } from '../../../../services/reactions.service';

import { IUser } from '../../../../interfaces/i-user';
import { IReaction } from '../../../../interfaces/i-reaction';
import { IComment } from '../../../../interfaces/i-comment';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  description: string =
    "In the past month, our blog experienced a 30% increase in traffic, reaching over 5,000 views compared to the previous month's 3,500. Additionally, user engagement hit a new high with 2,000 likes and 100 new registered users, reflecting a growing interest in our content.";
  usersCount: number = 0;
  reactionsCount: number = 0;
  commentsCount: number = 0;

  constructor(private userService: UserService, private reactionsService: ReactionsService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    this.userService.getUsersCount().subscribe({
      next: (count) => {
        this.usersCount = count;
      },
      error: (err) => {
        console.error(err);

      }
    });

    this.reactionsService.getReactionsCount().subscribe({
      next: (count) => {
        this.reactionsCount = count;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.reactionsService.getCommentsCount().subscribe({
      next: (count) => {
        this.commentsCount = count;
      },
      error: (err) => {
        console.error(err);

      }
    });
  }
}
