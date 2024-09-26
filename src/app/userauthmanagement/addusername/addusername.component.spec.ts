import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddusernameComponent } from './addusername.component';

describe('AddusernameComponent', () => {
  let component: AddusernameComponent;
  let fixture: ComponentFixture<AddusernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddusernameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddusernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
