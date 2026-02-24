import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsDetails } from './students-details';

describe('StudentsDetails', () => {
  let component: StudentsDetails;
  let fixture: ComponentFixture<StudentsDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
