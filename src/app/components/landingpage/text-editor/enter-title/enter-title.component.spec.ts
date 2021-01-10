import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterTitleComponent } from './enter-title.component';

describe('EnterTitleComponent', () => {
  let component: EnterTitleComponent;
  let fixture: ComponentFixture<EnterTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
