import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdDocumentsComponent } from './cd-documents.component';

describe('CdDocumentsComponent', () => {
  let component: CdDocumentsComponent;
  let fixture: ComponentFixture<CdDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
