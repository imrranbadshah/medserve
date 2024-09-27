import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdSpecialityBoardComponent } from './cd-speciality-board.component';

describe('CdSpecialityBoardComponent', () => {
  let component: CdSpecialityBoardComponent;
  let fixture: ComponentFixture<CdSpecialityBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdSpecialityBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdSpecialityBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
