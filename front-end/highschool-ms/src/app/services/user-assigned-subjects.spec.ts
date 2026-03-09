import { TestBed } from '@angular/core/testing';

import { UserAssignedSubjects } from './user-assigned-subjects';

describe('UserAssignedSubjects', () => {
  let service: UserAssignedSubjects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAssignedSubjects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
