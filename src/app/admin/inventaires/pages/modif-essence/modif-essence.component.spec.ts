import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifEssenceComponent } from './modif-essence.component';

describe('ModifEssenceComponent', () => {
  let component: ModifEssenceComponent;
  let fixture: ComponentFixture<ModifEssenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifEssenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifEssenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
