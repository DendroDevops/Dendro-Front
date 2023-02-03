import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEssenceComponent } from './add-essence.component';

describe('AddEssenceComponent', () => {
  let component: AddEssenceComponent;
  let fixture: ComponentFixture<AddEssenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEssenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEssenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
