import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdUgEducationComponent } from './cd-ug-education.component';

describe('CdUgEducationComponent', () => {
  let component: CdUgEducationComponent;
  let fixture: ComponentFixture<CdUgEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdUgEducationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdUgEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
