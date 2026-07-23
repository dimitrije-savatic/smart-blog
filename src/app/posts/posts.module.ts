import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { PostsBlockComponent } from './components/posts/posts-block/posts-block.component';
import { CommentInputComponent } from './components/posts/post/comment-input-form/comment-input.component';
import { SinglePostComponent } from './components/posts/post/single-post.component';
import { SharedModule } from '../shared/shared.module';
import { CommentsComponent } from './components/posts/post/comments/comments.component';

@NgModule({
  declarations: [
    PostsComponent,
    SinglePostComponent,
    PostsBlockComponent,
    CommentInputComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ]
})
export class PostsModule { }
