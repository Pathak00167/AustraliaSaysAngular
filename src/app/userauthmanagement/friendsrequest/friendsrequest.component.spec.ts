import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsrequestComponent } from './friendsrequest.component';

describe('FriendsrequestComponent', () => {
  let component: FriendsrequestComponent;
  let fixture: ComponentFixture<FriendsrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsrequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
