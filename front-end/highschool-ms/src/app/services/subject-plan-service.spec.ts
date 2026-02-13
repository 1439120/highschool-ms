import { TestBed } from '@angular/core/testing';

import { SubjectPlan } from './subject-plan-service';

describe('SubjectPlan', () => {
  let service: SubjectPlan;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectPlan);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
