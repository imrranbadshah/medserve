import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdUserInfoComponent } from './cd-user-info.component';

describe('CdUserInfoComponent', () => {
  let component: CdUserInfoComponent;
  let fixture: ComponentFixture<CdUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdUserInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
