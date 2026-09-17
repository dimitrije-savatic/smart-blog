import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { PostsBlockComponent } from './components/posts/posts-block/posts-block.component';
import { SinglePostComponent } from './components/posts/post-single/single-post.component';
import { SharedModule } from '../shared/shared.module';
import { CommentsComponent } from './components/posts/post-single/comments/comments.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroFaceFrown, heroFaceSmile, heroFire, heroHandThumbUp, heroHeart, heroChatBubbleLeftRight, heroEye, heroArrowRight, heroEllipsisVertical } from '@ng-icons/heroicons/outline';
import { heroFaceFrownSolid, heroFaceSmileSolid, heroFireSolid, heroHandThumbUpSolid, heroHeartSolid } from '@ng-icons/heroicons/solid';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './components/posts/post-single/comments/comment/comment.component';
import { CommentInputComponent } from './components/posts/post-single/comments/comment-input/comment-input.component';

@NgModule({
  declarations: [
    PostsComponent,
    SinglePostComponent,
    PostsBlockComponent,
    CommentsComponent,
    CommentComponent,
    CommentInputComponent,
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
      heroHeartSolid,
      heroChatBubbleLeftRight,
      heroEye,
      heroArrowRight,
      heroEllipsisVertical
    }),
    FormsModule
  ]
})
export class PostsModule { }
