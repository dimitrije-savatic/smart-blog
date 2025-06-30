import { Component, OnInit, Renderer2 } from '@angular/core';
import { PostsApiService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/i-user';
import { IPost } from '../../../interfaces/i-post';
import { LogService } from '../../../services/log.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  constructor(
    private logService: LogService,
    private postsApiService: PostsApiService,
    private userService: UserService,
    private renderer: Renderer2
  ) {}

  posts: IPost[] = [];
  categories: any[] = [];
  users: IUser[] = [];
  logs: any[] = [];

  showModal: boolean = false;
  title: string = '';
  type: string = '';
  id: number = 0;

  ngOnInit(): void {
    this.getAllData();
  }

  statistics: any[] = [
    {
      name: 'users',
      count: '45.5',
    },
    {
      name: 'likes',
      count: '12.3',
    },
    {
      name: 'dislikes',
      count: '2.7',
    },
    {
      name: 'comments',
      count: '4.9',
    },
  ];

  openModal(id: number, type: string, name: string): void {
    this.showModal = !this.showModal;
    this.title = name;
    this.type = type;
    this.id = id;
    if ((this.showModal = true)) {
      this.renderer.addClass(document.body, 'modal-open');
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.renderer.removeClass(document.body, 'modal-open');
  }

  deleteItem(id: number, type: string): void {
    this.postsApiService.deleteItem(id, type).subscribe({
      next: (data) => {
        console.log('Deleted successfully.', data);
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getAllData(): void {
    this.postsApiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.postsApiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.logService.getLogs().subscribe({
      next: (data) => {
        this.logs = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
