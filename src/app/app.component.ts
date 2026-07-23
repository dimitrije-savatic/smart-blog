import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'blog-app';

  isShown: boolean = false;

  topPositionToStartShowing = 200;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.scrollY;

    this.isShown = scrollPosition >= this.topPositionToStartShowing;
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


}
