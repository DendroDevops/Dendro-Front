import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDetailInventaireComponent } from './print-detail-inventaire.component';

describe('PrintDetailInventaireComponent', () => {
  let component: PrintDetailInventaireComponent;
  let fixture: ComponentFixture<PrintDetailInventaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintDetailInventaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDetailInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
