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
  loginButtonTitle: string = 'Login'
  logoutButtonTitle: string = 'Logout'
  appName: string = 'SmartBlog'
  message: string = ""

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.user = this.userService.getUser();
      console.log(this.user)
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
      name: "Contact",
      path: "contact"
    },
    {
      name: "Posts",
      path: "posts"
    },
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
