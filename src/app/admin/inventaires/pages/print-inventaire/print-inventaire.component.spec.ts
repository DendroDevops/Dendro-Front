import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintInventaireComponent } from './print-inventaire.component';

describe('PrintInventaireComponent', () => {
  let component: PrintInventaireComponent;
  let fixture: ComponentFixture<PrintInventaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintInventaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
