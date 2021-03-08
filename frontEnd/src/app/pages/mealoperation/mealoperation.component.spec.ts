import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealoperationComponent } from './mealoperation.component';

describe('MealoperationComponent', () => {
  let component: MealoperationComponent;
  let fixture: ComponentFixture<MealoperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealoperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
