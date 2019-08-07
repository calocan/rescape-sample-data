/**
 * Created by Andy Likuski on 2017.03.28
 * Copyright (c) 2017 Andy Likuski
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as R from 'ramda';
import {mergeDeep, mergeDeepWithConcatArrays} from 'rescape-ramda';
// I think rollup lets imports be null if not defined, in case any of these are not included in a production build
// https://github.com/rollup/rollup/pull/1342
import {sampleConfig} from '../samples/sampleConfig';
import {templateRegion} from '../default/templateRegion';
import {applyDefaultRegion, mapDefaultUsers, parseApiUrl} from 'rescape-helpers';
import {templateUsers} from '../default/templateUsers';

// eslint-disable-next-line no-undef
const environment = process.env.NODE_ENV;

/**
 * The active environment according env or NODE_ENV for testing or development
 * @params {Object} config The private config to pass to the sample config or development config
 * @params {String} env Defaults to the environment string value in {ROOT_DIR}/env.js.
 * Overrideable for testing
 * @type {any|*} if 'test' returns createSampleConfig. If 'development' gives a more complete config then test
 * If production throws an error
 */
export const getCurrentConfig = (config, env = environment) => {
  // Deep merge the given config with sampleConfig
  const envConfig = mergeDeepWithConcatArrays(
    R.cond([
      [R.equals('test'), R.always(sampleConfig)],
      [R.equals('dev'), R.always(sampleConfig)],
      [R.T, R.always(sampleConfig)]
    ])(env), config);

  // Process the config, applying templates, computing required values, and setting defaults
  return R.compose(
    // Make the first user the active user
    R.over(
      R.lensPath(['users', 0]),
      R.merge({isActive: true})
    ),
    // Apply default region to regions
    R.over(
      R.lensProp('regions'),
      R.compose(
        // Take values of regions, we don't need the keys
        R.unless(R.is(Array), R.values),
        applyDefaultRegion(templateRegion)
      )
    ),
    // Map the default templateUsers to user then flatten the results
    R.over(
      R.lensProp('users'),
      R.compose(
        // Once we apply templateUsers remove the template keys and flatten
        // If users are in objects remove the keys now
        R.chain(R.unless(R.is(Array), R.values)),
        // Remove the users role keys
        R.values,
        mapDefaultUsers(templateUsers)
      )
    ),
    // Set up the api uri from the parts
    R.over(
      R.lensPath(['settings', 'api']),
      obj => R.merge(obj, {uri: parseApiUrl(obj)})
    )
  )(envConfig);
};

/**
 * Resolves the current configuration based on the userSettings
 * This will all be dynamic eventually, not file based configuration
 * @param {Object} localSettings Default {}. Any localSettings that need to be deep merged into the conifg
 * @returns {Object} The resolved config
 */
export const currentConfigResolver = (config, localSettings = {}) => mergeDeep(getCurrentConfig(config), localSettings);
