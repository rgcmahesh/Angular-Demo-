import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeChoicePerFooterComponent } from './three-choice-per-footer.component';

describe('ThreeChoicePerFooterComponent', () => {
  let component: ThreeChoicePerFooterComponent;
  let fixture: ComponentFixture<ThreeChoicePerFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreeChoicePerFooterComponent]
    });
    fixture = TestBed.createComponent(ThreeChoicePerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
