import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../../../services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements OnInit {


  constructor(private testimonialService: TestimonialService){}

  testimonials: any[] = []

  ngOnInit(): void {
    this.getTestimonials()
  }

  testimonial1: string = 'I\'ve been following this news blog for over a year now, and it never fails to deliver insightful and timely content. The in-depth analysis and diverse perspectives keep me well-informed on global events, making it my go-to source for reliable news.'

  testimonial2: string = 'This blog stands out for its balanced reporting and engaging articles. Whether it\'s breaking news or thoughtful opinion pieces, I always find the information I need presented in a clear and compelling manner. It\'s an essential read every morning.'

  getTestimonials(){
    this.testimonialService.getTestimonialsWithUsers().subscribe({
      next: (data) => {
        this.testimonials = data;        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
