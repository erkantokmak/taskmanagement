/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GorevlerComponent } from './gorevler.component';

describe('GorevlerComponent', () => {
  let component: GorevlerComponent;
  let fixture: ComponentFixture<GorevlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GorevlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GorevlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
