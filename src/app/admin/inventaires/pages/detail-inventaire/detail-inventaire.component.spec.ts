import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInventaireComponent } from './detail-inventaire.component';

describe('DetailInventaireComponent', () => {
  let component: DetailInventaireComponent;
  let fixture: ComponentFixture<DetailInventaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInventaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
