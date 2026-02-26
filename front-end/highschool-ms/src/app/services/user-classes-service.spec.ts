import { TestBed } from '@angular/core/testing';

import { UserClasses } from './user-classes-service';

describe('UserClasses', () => {
  let service: UserClasses;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserClasses);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
