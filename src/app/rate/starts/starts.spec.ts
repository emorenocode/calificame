import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Starts } from './starts';

describe('Starts', () => {
  let component: Starts;
  let fixture: ComponentFixture<Starts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Starts],
    }).compileComponents();

    fixture = TestBed.createComponent(Starts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
