import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsHeader } from './actions-header';

describe('ActionsHeader', () => {
  let component: ActionsHeader;
  let fixture: ComponentFixture<ActionsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
