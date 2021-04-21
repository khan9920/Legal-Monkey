import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyLegalHamsterComponent } from './why-legal-hamster.component';

describe('WhyLegalHamsterComponent', () => {
  let component: WhyLegalHamsterComponent;
  let fixture: ComponentFixture<WhyLegalHamsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyLegalHamsterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyLegalHamsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
