import { TestBed } from '@angular/core/testing';

import { MembresiaUserService } from './membresia-user.service';

describe('MembresiaUserService', () => {
  let service: MembresiaUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembresiaUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
