import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerRegiterComponent } from './worker-regiter.component';

describe('WorkerRegiterComponent', () => {
  let component: WorkerRegiterComponent;
  let fixture: ComponentFixture<WorkerRegiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerRegiterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerRegiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
