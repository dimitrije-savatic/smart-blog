import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroChevronDown, heroChevronUp, heroDocumentPlus, heroFolderPlus } from '@ng-icons/heroicons/outline';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgIconsModule.withIcons({
      heroChevronUp,
      heroChevronDown,
      heroFolderPlus,
      heroDocumentPlus
    })]
})
export class AdminLayoutModule { }
