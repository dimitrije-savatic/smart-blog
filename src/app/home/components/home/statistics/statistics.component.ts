import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ReactionsService } from '../../../../services/reactions.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {

  constructor(private reactionsService: ReactionsService) { }

  description: string =
    "In the past month, our blog experienced a 30% increase in traffic, reaching over 5,000 views compared to the previous month's 3,500. Additionally, user engagement hit a new high with 2,000 likes and 100 new registered users, reflecting a growing interest in our content.";
  counts: any;
  statisticsArray: any[] = [];

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    this.reactionsService.getCounts().subscribe({
      next: (count) => {
        this.counts = count;
        this.statisticsArray = [{ "name": this.counts[0].name, "number": this.counts[0].number, "icon": 'heroUser' },
        { "name": this.counts[1].name, "number": this.counts[1].number, "icon": 'heroEye' },
        { "name": this.counts[2].name, "number": this.counts[2].number, "icon": 'heroHeart' },
        { "name": this.counts[3].name, "number": this.counts[3].number, "icon": 'heroChatBubbleLeftRight' }]
      },
      error: (err) => {
        console.error(err);
      }
    });

  }
}
