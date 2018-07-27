/**
 * Created by Andy Likuski on 2018.01.17
 * Copyright (c) 2018 Andy Likuski
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export {createBelgiumConfig} from './data/belgium/index';
export {createCaliforniaConfig} from './data/california/index';
export {getCurrentConfig, currentConfigResolver} from './data/current/index';
export {createDefaultConfig, userTemplateKeys, permissions} from './data/default/index';
export {createSampleConfig} from './data/samples/index';
export {stopResolver, routeResolver, tripResolver} from './data/dataQueryHelpers';
export {
  createTrip, createStopTimes, createRouteId, orderStops, createRoute, createService, createStop,
  createStopId, createStopTime, createTripId, createTripWithStopTimesPair, stopTimeGenerator,
  FROM_TO_DIRECTION, TO_FROM_DIRECTION
} from './data/dataCreationHelpers';
export {default as createInitialState} from './data/initialState';
export {createSimpleResolvedSchema, sampleSimpleResolvedSchema} from './sampleSchema/simpleResolvers'
export {default as createSchema} from './sampleSchema/schema'
