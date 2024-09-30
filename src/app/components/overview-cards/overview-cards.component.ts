import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overview-cards',
  standalone: true,
  imports: [],
  templateUrl: './overview-cards.component.html',
  styleUrl: './overview-cards.component.scss'
})
export class OverviewCardsComponent {
  @Input('data') data!: any;
}
