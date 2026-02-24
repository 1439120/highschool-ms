import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPlanDetails } from './lesson-plan-details';

describe('LessonPlanDetails', () => {
  let component: LessonPlanDetails;
  let fixture: ComponentFixture<LessonPlanDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonPlanDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonPlanDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
