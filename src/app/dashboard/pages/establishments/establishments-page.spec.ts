import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentsPage } from './establishments-page';

describe('EstablishmentsPage', () => {
  let component: EstablishmentsPage;
  let fixture: ComponentFixture<EstablishmentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EstablishmentsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
