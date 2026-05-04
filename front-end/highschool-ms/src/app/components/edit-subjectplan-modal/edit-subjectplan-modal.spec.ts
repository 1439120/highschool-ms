import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubjectplanModal } from './edit-subjectplan-modal';

describe('EditSubjectplanModal', () => {
  let component: EditSubjectplanModal;
  let fixture: ComponentFixture<EditSubjectplanModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSubjectplanModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubjectplanModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
