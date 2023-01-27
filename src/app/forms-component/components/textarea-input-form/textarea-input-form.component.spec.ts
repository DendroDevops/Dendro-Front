import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaInputFormComponent } from './textarea-input-form.component';

describe('TextareaInputFormComponent', () => {
  let component: TextareaInputFormComponent;
  let fixture: ComponentFixture<TextareaInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
