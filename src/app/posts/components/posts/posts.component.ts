import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {

  posts: any[] = [];
  categories: any[] = [];
  paginatedPosts: any[] = [];
  public perPage = 12;
  public currentPage = 0;
  search = '';
  selectedCategory = '';
  sortBy = 'newest';

  searchSubject = new Subject<string>();

  constructor(private postService: PostService) { }

  ngOnInit() {
    // Subscribe to search input changes with debounce
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(searchTerm => {
      this.search = searchTerm;
      this.filterPosts();
    })
    this.filterPosts();
    this.getCategories();
    this.updatePaginatedItems();
  }

  ngOnChanges() {
    this.filterPosts();
  }

  filterPosts() {
    let params = new HttpParams()
      .set('sort', this.sortBy);

    if (this.search) {
      params = params.set('search', this.search);
    }

    if (this.selectedCategory) {
      params = params.set('category', this.selectedCategory);
    }

    this.postService.getPosts(params).subscribe({
      next: (data) => {
        this.posts = data;
        this.updatePaginatedItems();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  resetFilters() {
    if (this.search == '' && this.selectedCategory == '' && this.sortBy == 'newest') {
      return;
    }
    this.search = '';
    this.selectedCategory = '';
    this.sortBy = 'newest';
    this.filterPosts();
  }

  private getCategories() {
    this.postService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.perPage = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedItems();
  }

  updatePaginatedItems() {
    const startIndex = this.currentPage * this.perPage;
    const endIndex = startIndex + this.perPage;
    this.paginatedPosts = this.posts.slice(startIndex, endIndex);
  }
}
