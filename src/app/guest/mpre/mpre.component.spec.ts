import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpreComponent } from './mpre.component';

describe('MpreComponent', () => {
  let component: MpreComponent;
  let fixture: ComponentFixture<MpreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MpreComponent]
    });
    fixture = TestBed.createComponent(MpreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
