import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEspeceComponent } from './detail-espece.component';

describe('DetailEspeceComponent', () => {
  let component: DetailEspeceComponent;
  let fixture: ComponentFixture<DetailEspeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEspeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEspeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
