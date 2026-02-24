import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPlanDetails } from './subject-plan-details';

describe('SubjectPlanDetails', () => {
  let component: SubjectPlanDetails;
  let fixture: ComponentFixture<SubjectPlanDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectPlanDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectPlanDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
