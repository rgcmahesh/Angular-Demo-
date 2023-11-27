import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LwaSchoolComponent } from './lwa-school.component';

describe('LwaSchoolComponent', () => {
  let component: LwaSchoolComponent;
  let fixture: ComponentFixture<LwaSchoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LwaSchoolComponent]
    });
    fixture = TestBed.createComponent(LwaSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
