import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpLayoutComponent } from './otp-layout.component';

describe('OtpLayoutComponent', () => {
  let component: OtpLayoutComponent;
  let fixture: ComponentFixture<OtpLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
