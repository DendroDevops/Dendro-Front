import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInputFormComponent } from './select-input-form.component';

describe('SelectInputFormComponent', () => {
  let component: SelectInputFormComponent;
  let fixture: ComponentFixture<SelectInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
