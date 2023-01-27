import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableWorkComponent } from './custom-table-work.component';

describe('CustomTableWorkComponent', () => {
  let component: CustomTableWorkComponent;
  let fixture: ComponentFixture<CustomTableWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTableWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTableWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
