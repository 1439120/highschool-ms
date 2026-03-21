import { TestBed } from '@angular/core/testing';

import { SubjectTopicService } from './subject-topic-service';

describe('SubjectTopicService', () => {
  let service: SubjectTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
