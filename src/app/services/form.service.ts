import { Injectable } from '@angular/core';

import { SimpleForm } from '../models/simple-form';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor() {}

  // map into valid form builder configuration
  buildConfig(entity): SimpleForm {
    const formConfiguration: SimpleForm = {};

    if (typeof entity === 'object') {
      for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
          const value = entity[key];

          // check for primitive values only
          if (typeof value !== 'function' && typeof value !== 'object') {
            const formControlConfig = [value];

            // check if validator function present
            const validatorKey =
              'validate' + key.substring(0, 1).toUpperCase() + key.substring(1);
            const validator = entity[validatorKey];

            if (typeof validator === 'function') {
              // add validations to configuration
              formControlConfig.push(validator());
            }

            // build form control config
            formConfiguration[key] = formControlConfig;
          }
        }
      }
    }

    return formConfiguration;
  }
}
