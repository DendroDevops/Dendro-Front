import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BevaComponent } from './beva.component';

describe('BevaComponent', () => {
  let component: BevaComponent;
  let fixture: ComponentFixture<BevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
