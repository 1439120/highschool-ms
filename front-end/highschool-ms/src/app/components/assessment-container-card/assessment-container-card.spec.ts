import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentContainerCard } from './assessment-container-card';

describe('AssessmentContainerCard', () => {
  let component: AssessmentContainerCard;
  let fixture: ComponentFixture<AssessmentContainerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentContainerCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentContainerCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
