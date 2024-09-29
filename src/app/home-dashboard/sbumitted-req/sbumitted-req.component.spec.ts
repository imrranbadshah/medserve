import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbumittedReqComponent } from './sbumitted-req.component';

describe('SbumittedReqComponent', () => {
  let component: SbumittedReqComponent;
  let fixture: ComponentFixture<SbumittedReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbumittedReqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SbumittedReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
