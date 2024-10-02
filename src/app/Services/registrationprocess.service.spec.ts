import { TestBed } from '@angular/core/testing';

import { RegistrationprocessService } from './registrationprocess.service';

describe('RegistrationprocessService', () => {
  let service: RegistrationprocessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationprocessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
