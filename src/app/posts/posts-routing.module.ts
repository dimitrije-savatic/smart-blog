import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { SinglePostComponent } from './components/posts/post-single/single-post.component';
import { PostGuard } from '../guards/post.guard';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';

const routes: Routes = [
  {
    path: "",
    component: PostsComponent
  },
  {
    path: "create",
    canActivate: [PostGuard],
    component: CreatePostComponent
  },
  {
    path: ":id",
    component: SinglePostComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
