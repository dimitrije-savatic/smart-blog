import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{


  user: any; 

  title = 'blog-app';

  isShow: boolean = false;

  topPositionToStartShowing = 200;

  ngOnInit(): void {
    
  }

  @HostListener('window:scroll')
  checkScroll(){
    const scrollPosition = window.scrollY;

    this.isShow = scrollPosition >= this.topPositionToStartShowing;
  }

  scrollToTop(){
    window.scroll({
      top:0,
      left:0,
      behavior: 'smooth'
    });
  }

  
    

}
