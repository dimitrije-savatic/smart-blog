import { Component, OnInit } from '@angular/core';
import { PostsApiService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/i-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 
  posts: any[] = []
  constructor(private postsApiService: PostsApiService, private userService: UserService){}

  users: IUser[] = []
  allUsers: number = 0
  allLikes: number = 0
  ngOnInit(): void {
    this.getAllData();
  }  

  getAllData(): void {
    this.postsApiService.getPosts().subscribe(data => {
      this.posts = data;
    })

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.allUsers = this.users.length
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
