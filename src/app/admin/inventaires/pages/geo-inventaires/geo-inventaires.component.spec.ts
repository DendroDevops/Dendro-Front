import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoInventairesComponent } from './geo-inventaires.component';

describe('GeoInventairesComponent', () => {
  let component: GeoInventairesComponent;
  let fixture: ComponentFixture<GeoInventairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoInventairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoInventairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
