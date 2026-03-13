import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-term-overview-card',
  imports: [],
  templateUrl: './term-overview-card.html',
  styleUrl: './term-overview-card.scss',
})
export class TermOverviewCard {
  term = input<string>()
  term_dates = input<string>();
  no_topics = input<number>()
  no_lessons = input<number>()
  no_assessments = input<number>()
  weeks = input<number>();
}
