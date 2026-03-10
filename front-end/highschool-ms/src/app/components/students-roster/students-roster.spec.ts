import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsRoster } from './students-roster';

describe('StudentsRoster', () => {
  let component: StudentsRoster;
  let fixture: ComponentFixture<StudentsRoster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsRoster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsRoster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
