import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBodyInfosEpaysageComponent } from './card-body-infos-epaysage.component';

describe('CardBodyInfosEpaysageComponent', () => {
  let component: CardBodyInfosEpaysageComponent;
  let fixture: ComponentFixture<CardBodyInfosEpaysageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBodyInfosEpaysageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBodyInfosEpaysageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
