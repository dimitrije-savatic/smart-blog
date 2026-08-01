import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditPostComponent } from './components/edit/edit-post/edit-post.component';
import { EditCategoryComponent } from './components/edit/edit-category/edit-category.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent
  },
  {
    path: "create/category",
    component: CreateCategoryComponent
  },
  {
    path: 'edit/post/:id',
    component: EditPostComponent
  },
  {
    path: 'edit/category/:id',
    component: EditCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
