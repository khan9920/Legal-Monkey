import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoLegalHamsterComponent } from './who-legal-hamster.component';

describe('WhoLegalHamsterComponent', () => {
  let component: WhoLegalHamsterComponent;
  let fixture: ComponentFixture<WhoLegalHamsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoLegalHamsterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoLegalHamsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
