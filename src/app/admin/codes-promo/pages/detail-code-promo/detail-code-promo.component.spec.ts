import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCodePromoComponent } from './detail-code-promo.component';

describe('DetailCodePromoComponent', () => {
  let component: DetailCodePromoComponent;
  let fixture: ComponentFixture<DetailCodePromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCodePromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCodePromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
