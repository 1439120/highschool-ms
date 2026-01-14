import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Iontable } from './iontable';

describe('Iontable', () => {
  let component: Iontable;
  let fixture: ComponentFixture<Iontable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Iontable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Iontable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
