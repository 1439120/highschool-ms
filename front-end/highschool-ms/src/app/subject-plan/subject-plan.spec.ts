import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPlan } from './subject-plan';

describe('SubjectPlan', () => {
  let component: SubjectPlan;
  let fixture: ComponentFixture<SubjectPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectPlan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectPlan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
