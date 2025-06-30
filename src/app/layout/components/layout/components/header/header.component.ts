import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  
  user: any
  active: string = 'text-green-500';
  loginButtonTitle : string = 'Login'
  logoutButtonTitle : string = 'Logout'
  appName : string = 'SmartBlog'

  constructor(private userService: UserService){}

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.user = this.userService.getUser();
    }else{
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

  onSubmit(): void{
    this.userService.logout();
    window.location.reload();
  }
}
