import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() post: any
  @Input() category: any
  @Input() showPostModal!: boolean
  @Input() showCategoryModal!: boolean
}
