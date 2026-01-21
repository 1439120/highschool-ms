import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersDetails } from './teachers-details';

describe('TeachersDetails', () => {
  let component: TeachersDetails;
  let fixture: ComponentFixture<TeachersDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
