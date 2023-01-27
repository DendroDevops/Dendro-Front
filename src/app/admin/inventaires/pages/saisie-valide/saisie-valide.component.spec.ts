import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieValideComponent } from './saisie-valide.component';

describe('SaisieValideComponent', () => {
  let component: SaisieValideComponent;
  let fixture: ComponentFixture<SaisieValideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaisieValideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisieValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
