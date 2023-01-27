import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChampignonsComponent } from './list-champignons.component';

describe('ListChampignonsComponent', () => {
  let component: ListChampignonsComponent;
  let fixture: ComponentFixture<ListChampignonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChampignonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChampignonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
