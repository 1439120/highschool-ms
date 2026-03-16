import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectTopicInformation } from './subject-topic-information';

describe('SubjectTopicInformation', () => {
  let component: SubjectTopicInformation;
  let fixture: ComponentFixture<SubjectTopicInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectTopicInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectTopicInformation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
