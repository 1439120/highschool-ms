import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentViewCard } from './assessment-view-card';

describe('AssessmentViewCard', () => {
  let component: AssessmentViewCard;
  let fixture: ComponentFixture<AssessmentViewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentViewCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentViewCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
