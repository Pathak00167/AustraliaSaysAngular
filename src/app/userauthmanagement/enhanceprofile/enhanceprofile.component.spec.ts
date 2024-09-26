import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhanceprofileComponent } from './enhanceprofile.component';

describe('EnhanceprofileComponent', () => {
  let component: EnhanceprofileComponent;
  let fixture: ComponentFixture<EnhanceprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnhanceprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnhanceprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
