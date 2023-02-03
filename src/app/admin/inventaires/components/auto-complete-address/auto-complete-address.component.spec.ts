import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteAddressComponent } from './auto-complete-address.component';

describe('AutoCompleteAddressComponent', () => {
  let component: AutoCompleteAddressComponent;
  let fixture: ComponentFixture<AutoCompleteAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
