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
import {globalSampleConfig} from './global-sample/globalSampleConfig';
import {oaklandSampleConfig} from './oakland-sample/oaklandSampleConfig';
import {parisSampleConfig} from './paris-sample/parisSampleConfig';
import {belgiumConfig} from '../belgium/belgiumConfig';
import {mergeDeepAll} from 'rescape-ramda';

/**
 * Creates a sampleConfig with the given environment config
 * @param {Object} config Defaults to environments/testConfig
 * @return {Object} A complete sample config
 */
export const sampleConfig = mergeDeepAll([
  {
    settings: {
      domain: 'localhost',
      api: {
      },
      // Overpass API configuration to play nice with the server's strict throttling
      overpass: {
        cellSize: 100,
        sleepBetweenCalls: 1000
      },
      markers: {},
      mapbox: {
        // This will probably not be used unless we need to cluster something on the map
        iconAtlas: 'data/location-icon-atlas.png',
        // ditto
        showCluster: true,
        showZoomControls: true,
        // Universal Mapbox parameters to apply to any mapbox instance
        preventStyleDiffing: false
      }
    },
      // Any browser settings that would normally be set externally by the browser
    browser: {
      width: 1080,
      height: 720
    },
    // Required value
    styles: {
      default: {}
    }
  },
  globalSampleConfig,
  belgiumConfig,

  // Oakland Region
  oaklandSampleConfig,
  // Paris Region
  parisSampleConfig
]);
