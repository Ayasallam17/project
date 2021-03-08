import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmealComponent } from './allmeal.component';

describe('AllmealComponent', () => {
  let component: AllmealComponent;
  let fixture: ComponentFixture<AllmealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllmealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllmealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
