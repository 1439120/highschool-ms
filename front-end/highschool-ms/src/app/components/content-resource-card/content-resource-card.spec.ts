import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentResourceCard } from './content-resource-card';

describe('ContentResourceCard', () => {
  let component: ContentResourceCard;
  let fixture: ComponentFixture<ContentResourceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentResourceCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentResourceCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
