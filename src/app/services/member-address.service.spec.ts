import { TestBed } from '@angular/core/testing';

import { MemberAddressService } from './member-address.service';

describe('MemberAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberAddressService = TestBed.get(MemberAddressService);
    expect(service).toBeTruthy();
  });
});
