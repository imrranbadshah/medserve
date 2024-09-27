import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdLicenceRegisterComponent } from './cd-licence-register.component';

describe('CdLicenceRegisterComponent', () => {
  let component: CdLicenceRegisterComponent;
  let fixture: ComponentFixture<CdLicenceRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdLicenceRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdLicenceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
