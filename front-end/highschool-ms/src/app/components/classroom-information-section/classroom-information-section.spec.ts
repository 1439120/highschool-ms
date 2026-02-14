import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomInformationSection } from './classroom-information-section';

describe('ClassroomInformationSection', () => {
  let component: ClassroomInformationSection;
  let fixture: ComponentFixture<ClassroomInformationSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassroomInformationSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomInformationSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
