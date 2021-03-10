import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkernavComponent } from './workernav.component';

describe('WorkernavComponent', () => {
  let component: WorkernavComponent;
  let fixture: ComponentFixture<WorkernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
