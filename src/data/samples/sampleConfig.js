/**
 * Created by Andy Likuski on 2017.03.28
 * Copyright (c) 2017 Andy Likuski
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as R from 'ramda';
import {environmentConfig} from 'environments/testConfig';
import {createGlobalSampleConfig} from './global-sample/globalSampleConfig';
import {createOaklandSampleConfig} from './oakland-sample/oaklandSampleConfig';
import {createParisSampleConfig} from './paris-sample/parisSampleConfig';
import {createBelgiumConfig} from 'data/belgium/belgiumConfig'
import {mergeDeepAll} from 'rescape-ramda';
import {defaultConfig} from 'data/default/defaultConfig';
import {firstUserLens} from 'rescape-helpers';

// Merge the global and regional sampleConfigs
/**
 * Creates a sampleConfig with the given environment config
 * @param {Object} config Defaults to environments/testConfig
 * @return {Object} A complete sample config
 */
export const createSampleConfig = (config = environmentConfig) => {
  const belgiumConfig = createBelgiumConfig(config);
  return mergeDeepAll([
    {
      // Any settings that aren't Region specific.
      styles: defaultConfig.styles,
      // Any browser settings that would normally be set externally by the browser
      browser: {
        width: 1080,
        height: 720
      }
    },
    createGlobalSampleConfig(config),
    // Belgium Region
    R.over(
      // Make the first user of Belgium region active
      firstUserLens(belgiumConfig),
      R.merge({isActive: true}),
      belgiumConfig
    ),
    // Oakland Region
    createOaklandSampleConfig(config),
    // Paris Region
    createParisSampleConfig(config)
  ]);
};
