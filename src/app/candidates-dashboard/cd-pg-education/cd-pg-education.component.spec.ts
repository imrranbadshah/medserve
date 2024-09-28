import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdPgEducationComponent } from './cd-pg-education.component';

describe('CdPgEducationComponent', () => {
  let component: CdPgEducationComponent;
  let fixture: ComponentFixture<CdPgEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdPgEducationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdPgEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
