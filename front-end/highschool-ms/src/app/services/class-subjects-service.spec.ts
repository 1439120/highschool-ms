import { TestBed } from '@angular/core/testing';

import { ClassSubjectsService } from './class-subjects-service';

describe('ClassSubjectsService', () => {
  let service: ClassSubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassSubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
