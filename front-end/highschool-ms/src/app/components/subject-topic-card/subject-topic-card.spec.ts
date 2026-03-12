import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectTopicCard } from './subject-topic-card';

describe('SubjectTopicCard', () => {
  let component: SubjectTopicCard;
  let fixture: ComponentFixture<SubjectTopicCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectTopicCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectTopicCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
