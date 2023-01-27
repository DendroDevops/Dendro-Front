import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEspeceComponent } from './add-espece.component';

describe('AddEspeceComponent', () => {
  let component: AddEspeceComponent;
  let fixture: ComponentFixture<AddEspeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEspeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEspeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
