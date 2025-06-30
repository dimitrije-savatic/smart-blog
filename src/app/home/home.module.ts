import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeroComponent } from './components/home/hero/hero.component';
import { NewsComponent } from './components/home/news/news.component';
import { TestimonialsComponent } from './components/home/testimonials/testimonials.component';
import { StatisticsComponent } from './components/home/statistics/statistics.component';
import { RouterModule } from '@angular/router';
import { HeroBlockComponent } from './components/home/hero/hero-block/hero-block.component';
import { NewsBlockComponent } from './components/home/news/news-block/news-block.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    NewsComponent,
    TestimonialsComponent,
    StatisticsComponent,
    HeroBlockComponent,
    NewsBlockComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class HomeModule { }
