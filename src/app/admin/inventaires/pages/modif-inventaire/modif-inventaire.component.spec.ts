import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifInventaireComponent } from './modif-inventaire.component';

describe('ModifInventaireComponent', () => {
  let component: ModifInventaireComponent;
  let fixture: ComponentFixture<ModifInventaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifInventaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
