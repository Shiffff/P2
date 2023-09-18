import { TestBed } from '@angular/core/testing';

import { DataFormaterService } from './data-formater.service';

describe('DataFormaterService', () => {
  let service: DataFormaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFormaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
