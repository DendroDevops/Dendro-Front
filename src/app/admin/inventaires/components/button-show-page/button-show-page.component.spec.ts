import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonShowPageComponent } from './button-show-page.component';

describe('ButtonShowPageComponent', () => {
  let component: ButtonShowPageComponent;
  let fixture: ComponentFixture<ButtonShowPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonShowPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
