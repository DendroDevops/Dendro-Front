import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUserInventoryComponent } from './info-user-inventory.component';

describe('InfoUserInventoryComponent', () => {
  let component: InfoUserInventoryComponent;
  let fixture: ComponentFixture<InfoUserInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoUserInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoUserInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
