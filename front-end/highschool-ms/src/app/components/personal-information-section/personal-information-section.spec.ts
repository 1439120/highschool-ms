import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationSection } from './personal-information-section';

describe('PersonalInformationSection', () => {
  let component: PersonalInformationSection;
  let fixture: ComponentFixture<PersonalInformationSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInformationSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInformationSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
