import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleResponseComponent } from './simple-response.component';

describe('SimpleResponseComponent', () => {
  let component: SimpleResponseComponent;
  let fixture: ComponentFixture<SimpleResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
