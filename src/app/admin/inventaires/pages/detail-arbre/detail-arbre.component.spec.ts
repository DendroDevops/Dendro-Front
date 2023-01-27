import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailArbreComponent } from './detail-arbre.component';

describe('DetailArbreComponent', () => {
  let component: DetailArbreComponent;
  let fixture: ComponentFixture<DetailArbreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailArbreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailArbreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
