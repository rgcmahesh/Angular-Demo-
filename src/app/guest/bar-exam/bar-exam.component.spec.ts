import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarExamComponent } from './bar-exam.component';

describe('BarExamComponent', () => {
  let component: BarExamComponent;
  let fixture: ComponentFixture<BarExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarExamComponent]
    });
    fixture = TestBed.createComponent(BarExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
