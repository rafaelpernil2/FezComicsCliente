import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeriePage } from './add-serie.page';

describe('AddSeriePage', () => {
  let component: AddSeriePage;
  let fixture: ComponentFixture<AddSeriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSeriePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
