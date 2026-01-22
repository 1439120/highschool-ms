import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInformationSection } from './contact-information-section';

describe('ContactInformationSection', () => {
  let component: ContactInformationSection;
  let fixture: ComponentFixture<ContactInformationSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInformationSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInformationSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
