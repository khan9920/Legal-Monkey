import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConversionComponent } from './view-conversion.component';

describe('ViewConversionComponent', () => {
  let component: ViewConversionComponent;
  let fixture: ComponentFixture<ViewConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
