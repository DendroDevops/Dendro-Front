import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChampignonsComponent } from './detail-champignons.component';

describe('DetailChampignonsComponent', () => {
  let component: DetailChampignonsComponent;
  let fixture: ComponentFixture<DetailChampignonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailChampignonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailChampignonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
