import { Component } from '@angular/core';
import { HelpersService } from '../../services/helpers/helpers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  constructor(public helper: HelpersService) {}

  removeToast(toast: any) {
    this.helper.remove(toast);
  }
}
