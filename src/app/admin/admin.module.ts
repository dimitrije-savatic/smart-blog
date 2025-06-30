import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { EditPostComponent } from './components/edit/edit-post/edit-post.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './components/create/create.component';
import { EditCategoryComponent } from './components/edit/edit-category/edit-category.component';

@NgModule({
  declarations: [
    AdminComponent,
    EditPostComponent,
    CreateComponent,
    EditCategoryComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
