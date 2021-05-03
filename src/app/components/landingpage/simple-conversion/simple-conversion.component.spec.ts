import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleConversionComponent } from './simple-conversion.component';

describe('SimpleConversionComponent', () => {
  let component: SimpleConversionComponent;
  let fixture: ComponentFixture<SimpleConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleConversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
