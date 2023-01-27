import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigChampignonsComponent } from './config-champignons.component';

describe('ConfigChampignonsComponent', () => {
  let component: ConfigChampignonsComponent;
  let fixture: ComponentFixture<ConfigChampignonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigChampignonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigChampignonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
