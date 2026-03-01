import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSelectModal } from './generic-select-modal';

describe('GenericSelectModal', () => {
  let component: GenericSelectModal;
  let fixture: ComponentFixture<GenericSelectModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericSelectModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericSelectModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
