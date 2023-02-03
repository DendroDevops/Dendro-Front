import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPageComponent } from './total-page.component';

describe('TotalPageComponent', () => {
  let component: TotalPageComponent;
  let fixture: ComponentFixture<TotalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
