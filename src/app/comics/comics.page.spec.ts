import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsPage } from './comics.page';

describe('ComicsPage', () => {
  let component: ComicsPage;
  let fixture: ComponentFixture<ComicsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
