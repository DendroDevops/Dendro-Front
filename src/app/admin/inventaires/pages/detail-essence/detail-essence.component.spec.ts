import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEssenceComponent } from './detail-essence.component';

describe('DetailEssenceComponent', () => {
  let component: DetailEssenceComponent;
  let fixture: ComponentFixture<DetailEssenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEssenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEssenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
