import { TestBed } from '@angular/core/testing';

import { MemberPhoneService } from './member-phone.service';

describe('MemberPhoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberPhoneService = TestBed.get(MemberPhoneService);
    expect(service).toBeTruthy();
  });
});
