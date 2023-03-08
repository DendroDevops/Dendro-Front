import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteAdressesComponent } from './auto-complete-adresses.component';

describe('AutoCompleteAdressesComponent', () => {
  let component: AutoCompleteAdressesComponent;
  let fixture: ComponentFixture<AutoCompleteAdressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteAdressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteAdressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
