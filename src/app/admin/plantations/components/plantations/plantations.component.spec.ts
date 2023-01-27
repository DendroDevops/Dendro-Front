import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantationsComponent } from './plantations.component';

describe('PlantationsComponent', () => {
  let component: PlantationsComponent;
  let fixture: ComponentFixture<PlantationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
