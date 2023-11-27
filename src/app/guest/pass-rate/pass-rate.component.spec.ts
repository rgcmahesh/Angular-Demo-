import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassRateComponent } from './pass-rate.component';

describe('PassRateComponent', () => {
  let component: PassRateComponent;
  let fixture: ComponentFixture<PassRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassRateComponent]
    });
    fixture = TestBed.createComponent(PassRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
