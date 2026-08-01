import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { PostsBlockComponent } from './components/posts/posts-block/posts-block.component';
import { CommentInputComponent } from './components/posts/post-single/comment-input-form/comment-input.component';
import { SinglePostComponent } from './components/posts/post-single/single-post.component';
import { SharedModule } from '../shared/shared.module';
import { CommentsComponent } from './components/posts/post-single/comments/comments.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroFaceFrown, heroFaceSmile, heroFire, heroHandThumbUp, heroHeart } from '@ng-icons/heroicons/outline';
import { heroFaceFrownSolid, heroFaceSmileSolid, heroFireSolid, heroHandThumbUpSolid, heroHeartSolid } from '@ng-icons/heroicons/solid';

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
    SharedModule,
    NgIconsModule.withIcons({
      heroFaceSmile,
      heroFaceSmileSolid,
      heroHandThumbUp,
      heroHandThumbUpSolid,
      heroFire,
      heroFireSolid,
      heroFaceFrown,
      heroFaceFrownSolid,
      heroHeart,
      heroHeartSolid
    })
  ]
})
export class PostsModule { }
