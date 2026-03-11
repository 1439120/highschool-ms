import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsViewerModal } from './documents-viewer-modal';

describe('DocumentsViewerModal', () => {
  let component: DocumentsViewerModal;
  let fixture: ComponentFixture<DocumentsViewerModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsViewerModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsViewerModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
