import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermOverviewCard } from './term-overview-card';

describe('TermOverviewCard', () => {
  let component: TermOverviewCard;
  let fixture: ComponentFixture<TermOverviewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermOverviewCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermOverviewCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
