import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarObraComponent } from './agregar-obra.component';

describe('AgregarObraComponent', () => {
  let component: AgregarObraComponent;
  let fixture: ComponentFixture<AgregarObraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarObraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
