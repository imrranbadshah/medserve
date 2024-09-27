import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdSchoolingsComponent } from './cd-schoolings.component';

describe('CdSchoolingsComponent', () => {
  let component: CdSchoolingsComponent;
  let fixture: ComponentFixture<CdSchoolingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdSchoolingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdSchoolingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
