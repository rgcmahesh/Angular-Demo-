import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlmComponent } from './llm.component';

describe('LlmComponent', () => {
  let component: LlmComponent;
  let fixture: ComponentFixture<LlmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlmComponent]
    });
    fixture = TestBed.createComponent(LlmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
