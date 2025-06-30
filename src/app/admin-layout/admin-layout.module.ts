import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from "./components/admin-layout/admin-layout.component";
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminHeaderComponent } from './components/admin-layout/components/admin-header/admin-header.component';
import { AdminFooterComponent } from './components/admin-layout/components/admin-footer/admin-footer.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class AdminLayoutModule { }
