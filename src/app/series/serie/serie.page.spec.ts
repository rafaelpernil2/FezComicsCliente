import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriePage } from './serie.page';

describe('SeriePage', () => {
  let component: SeriePage;
  let fixture: ComponentFixture<SeriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
