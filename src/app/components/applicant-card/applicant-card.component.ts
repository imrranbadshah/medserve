import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate/truncate.pipe';

@Component({
  selector: 'app-applicant-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './applicant-card.component.html',
  styleUrl: './applicant-card.component.scss'
})
export class ApplicantCardComponent {
  @Input('data') candidate: any;
  @Output() selectedCandidate = new EventEmitter();

  addToSelectedList(data: any) {
    data.isSelected = !data.isSelected;

    this.selectedCandidate.emit(data);
  }
}
