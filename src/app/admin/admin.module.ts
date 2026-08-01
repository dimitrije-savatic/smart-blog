import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { EditPostComponent } from './components/edit/edit-post/edit-post.component';
import { SharedModule } from '../shared/shared.module';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditCategoryComponent } from './components/edit/edit-category/edit-category.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroChatBubbleLeftRight, heroHeart, heroUser } from '@ng-icons/heroicons/outline';

@NgModule({
  declarations: [
    AdminComponent,
    EditPostComponent,
    CreateCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgIconsModule.withIcons({
      heroHeart,
      heroUser,
      heroChatBubbleLeftRight
    })
  ]
})
export class AdminModule { }
