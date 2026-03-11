import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUploadModal } from './document-upload-modal';

describe('DocumentUploadModal', () => {
  let component: DocumentUploadModal;
  let fixture: ComponentFixture<DocumentUploadModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentUploadModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentUploadModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
