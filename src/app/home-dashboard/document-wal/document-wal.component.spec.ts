import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentWalComponent } from './document-wal.component';

describe('DocumentWalComponent', () => {
  let component: DocumentWalComponent;
  let fixture: ComponentFixture<DocumentWalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentWalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentWalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
