import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  user: any = null;
  active: string = 'text-green-500';
  writePostButtonActive: string = 'text-white bg-green-500 border-white';
  loginButtonTitle: string = 'Login'
  logoutButtonTitle: string = 'Logout'
  createPostButtonTitle: string = 'Write post'
  appName: string = 'SmartBlog'
  message: string = ""

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.user = this.authService.getUser();
    } else {
      console.log("User is not logged in.")
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
        this.authService.clearUser();
        window.location.reload()
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
