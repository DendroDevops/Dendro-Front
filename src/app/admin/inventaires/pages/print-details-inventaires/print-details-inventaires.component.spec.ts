import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDetailsInventairesComponent } from './print-details-inventaires.component';

describe('PrintDetailsInventairesComponent', () => {
  let component: PrintDetailsInventairesComponent;
  let fixture: ComponentFixture<PrintDetailsInventairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintDetailsInventairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDetailsInventairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
