import { TestBed } from '@angular/core/testing';

import { ProfileService } from './quest.service';

describe('OrganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });
});
