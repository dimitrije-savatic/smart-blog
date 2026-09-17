import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit {

  appName: string = "SmartBlog"
  user: any;
  isOpen = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.user = this.authService.getUser()
    } else {
      console.log("User is not admin.");
    }
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  active: string = 'text-orange-500';

  links: any[] = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Admin Panel",
      path: "/admin"
    }
  ]
}
