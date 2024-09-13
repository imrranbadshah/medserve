import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdPersonalComponent } from './cd-personal.component';

describe('CdPersonalComponent', () => {
  let component: CdPersonalComponent;
  let fixture: ComponentFixture<CdPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdPersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
