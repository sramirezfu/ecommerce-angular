import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDeployComponent } from './car-deploy.component';

describe('CarDeployComponent', () => {
  let component: CarDeployComponent;
  let fixture: ComponentFixture<CarDeployComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDeployComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
