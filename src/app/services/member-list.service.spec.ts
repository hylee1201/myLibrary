import { TestBed } from '@angular/core/testing';

import { MemberListService } from './member-list.service';

describe('MemberListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberListService = TestBed.get(MemberListService);
    expect(service).toBeTruthy();
  });
});
