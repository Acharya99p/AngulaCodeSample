import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';
import { Validators } from '@angular/forms';

describe('FormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormService = TestBed.get(FormService);
    expect(service).toBeTruthy();
  });

  it('should build the config object', () => {
    const service: FormService = TestBed.get(FormService);

    // user object to map into form builder config
    const user = {
      name: 'John',
      validateName() {
        return Validators.required;
      }
    };

    // end result
    const finalConfig = { name: ['John', Validators.required] };

    const config = service.buildConfig(user);

    expect(config).toEqual(finalConfig);
  });
});
