import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { AuthService } from '../../../../../services/auth.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  user: any
  active: string = 'text-green-500';
  writePostButtonActive: string = 'text-white bg-green-500 border-white';
  loginButtonTitle: string = 'Login'
  logoutButtonTitle: string = 'Logout'
  createPostButtonTitle: string = 'Write post'
  appName: string = 'SmartBlog'
  message: string = ""

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.user = this.userService.getUser();
    } else {
      console.log('User not logged in.');
    }
  }

  links: any[] = [
    {
      name: "Home",
      path: "home"
    },
    {
      name: "Posts",
      path: "posts"
    },
    {
      name: "Contact",
      path: "contact"
    }
  ]

  logout(): void {
    this.authService.logout(this.user).subscribe({
      next: (data) => {
        this.message = data
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.reload()
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
