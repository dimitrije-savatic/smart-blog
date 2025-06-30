import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { SinglePostComponent } from './components/posts/single-post/single-post.component';
import { PostGuard } from '../guards/post.guard';

const routes: Routes = [
  {
    path: "",
    component: PostsComponent
  },
  {
    path: "post/:id",
    canActivate: [PostGuard],
    component: SinglePostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
