import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVisitaComponent } from './ver-visita.component';

describe('VerVisitaComponent', () => {
  let component: VerVisitaComponent;
  let fixture: ComponentFixture<VerVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerVisitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
