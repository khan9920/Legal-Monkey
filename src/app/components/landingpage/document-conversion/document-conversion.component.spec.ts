import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentConversionComponent } from './document-conversion.component';

describe('DocumentConversionComponent', () => {
  let component: DocumentConversionComponent;
  let fixture: ComponentFixture<DocumentConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentConversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
