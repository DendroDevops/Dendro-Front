import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEspeceComponent } from './list-espece.component';

describe('ListEspeceComponent', () => {
  let component: ListEspeceComponent;
  let fixture: ComponentFixture<ListEspeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEspeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEspeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
