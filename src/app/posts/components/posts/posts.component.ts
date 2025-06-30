import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsApiService } from '../../../services/post.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {

  posts: any[] = [];
  paginatedPosts: any[] = [];
  public pageSize = 10;
  public currentPage = 0;

  buttonTitle: string = 'View All';


  constructor(private postsService: PostsApiService) {}

  ngOnInit() {
    this.getPosts();
    this.updatePaginatedItems();
  }

  private getPosts() {
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.updatePaginatedItems();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onPageChange(event: PageEvent){
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedItems();
  }

  updatePaginatedItems(){
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPosts = this.posts.slice(startIndex, endIndex);
  }
}
