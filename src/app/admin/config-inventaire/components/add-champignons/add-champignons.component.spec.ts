import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChampignonsComponent } from './add-champignons.component';

describe('AddChampignonsComponent', () => {
  let component: AddChampignonsComponent;
  let fixture: ComponentFixture<AddChampignonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChampignonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChampignonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
