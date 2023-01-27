import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputFormComponent } from './date-input-form.component';

describe('DateInputFormComponent', () => {
  let component: DateInputFormComponent;
  let fixture: ComponentFixture<DateInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
