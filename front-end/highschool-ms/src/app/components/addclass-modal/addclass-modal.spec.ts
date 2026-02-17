import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclassModal } from './addclass-modal';

describe('AddclassModal', () => {
  let component: AddclassModal;
  let fixture: ComponentFixture<AddclassModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddclassModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddclassModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
