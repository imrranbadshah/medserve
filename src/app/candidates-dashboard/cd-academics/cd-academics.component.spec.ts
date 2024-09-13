import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdAcademicsComponent } from './cd-academics.component';

describe('CdAcademicsComponent', () => {
  let component: CdAcademicsComponent;
  let fixture: ComponentFixture<CdAcademicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdAcademicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdAcademicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
