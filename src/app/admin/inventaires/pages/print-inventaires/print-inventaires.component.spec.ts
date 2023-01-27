import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintInventairesComponent } from './print-inventaires.component';

describe('PrintInventairesComponent', () => {
  let component: PrintInventairesComponent;
  let fixture: ComponentFixture<PrintInventairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintInventairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintInventairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
