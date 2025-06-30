import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit{

  appName : string = "SmartBlog"
  user: any;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
       this.user = this.userService.getUser();
    }else{
      console.log('User not logged in.');
    }
  }

  active: string = 'text-orange-500';

  links: any[] = [
    {
      name: "Admin Panel",
      path: "/admin"
    },
    {
      name: "Create",
      path: "create"
    },
  ]
}
