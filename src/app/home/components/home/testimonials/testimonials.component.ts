import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../../../services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements OnInit {


  constructor(private testimonialService: TestimonialService) { }

  testimonials: any[] = []
  description: string = "See what our readers and contributors have to say about their experience with Smart Blog."

  ngOnInit(): void {
    this.getTestimonials()
  }

  getTestimonials() {
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
