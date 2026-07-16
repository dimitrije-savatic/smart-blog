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
}
