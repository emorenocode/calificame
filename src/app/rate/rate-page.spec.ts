import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatePage } from './rate-page';

describe('RatePage', () => {
  let component: RatePage;
  let fixture: ComponentFixture<RatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatePage],
    }).compileComponents();

    fixture = TestBed.createComponent(RatePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
