import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CreateComponent } from './components/create/create.component';
import { EditPostComponent } from './components/edit/edit-post/edit-post.component';
import { EditCategoryComponent } from './components/edit/edit-category/edit-category.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent
  },
  {
    path: "create",
    component: CreateComponent
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
