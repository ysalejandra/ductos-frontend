import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInformeComponent } from './add-informe.component';

describe('AddInformeComponent', () => {
  let component: AddInformeComponent;
  let fixture: ComponentFixture<AddInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
