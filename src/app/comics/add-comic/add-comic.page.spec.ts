import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComicPage } from './add-comic.page';

describe('AddComicPage', () => {
  let component: AddComicPage;
  let fixture: ComponentFixture<AddComicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
