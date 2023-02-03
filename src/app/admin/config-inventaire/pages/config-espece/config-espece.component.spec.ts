import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigEspeceComponent } from './config-espece.component';

describe('ConfigEspeceComponent', () => {
  let component: ConfigEspeceComponent;
  let fixture: ComponentFixture<ConfigEspeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigEspeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigEspeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
