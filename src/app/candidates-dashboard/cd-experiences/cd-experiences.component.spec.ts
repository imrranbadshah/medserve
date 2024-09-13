import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdExperiencesComponent } from './cd-experiences.component';

describe('CdExperiencesComponent', () => {
  let component: CdExperiencesComponent;
  let fixture: ComponentFixture<CdExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdExperiencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
