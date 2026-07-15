import { Component, Input, OnInit } from '@angular/core';
import { ReactionsService } from '../../../../../services/reactions.service';
import { IReaction } from '../../../../../interfaces/i-reaction';

@Component({
  selector: 'app-hero-block',
  templateUrl: './hero-block.component.html',
  styleUrl: './hero-block.component.css',
})
export class HeroBlockComponent implements OnInit {
  @Input() post!: any;
  reactions: IReaction[] = [];

  constructor(private reactionsService: ReactionsService) { }

  ngOnInit(): void {
  }

}
