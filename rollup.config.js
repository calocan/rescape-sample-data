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
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import autoExternal from 'rollup-plugin-auto-external';
import json from 'rollup-plugin-json';

const env = process.env.NODE_ENV;
const config = {
  input: [
    './src/index.js',
    './src/config.js',
    './src/data/belgium/belgiumCities.json',
    './src/data/belgium/belgiumConfig.js',
    './src/data/belgium/belgiumJourneys.json',
    './src/data/belgium/belgiumOsm.js',
    './src/data/belgium/belgiumPlaces.js',
    './src/data/belgium/belgiumRegions.js',
    './src/data/belgium/belgiumRoutes.js',
    './src/data/belgium/belgiumSankeySample.js',
    './src/data/belgium/belgiumSankeySample.spec.js',
    './src/data/belgium/belgiumStops.js',
    './src/data/belgium/belgiumTrips.js',
    './src/data/belgium/belgiumUserLocations.json',
    './src/data/belgium/belgiumUsers.js',
    './src/data/belgium/belgiumRoutings.json',
    './src/data/california/californiaCities.json',
    './src/data/california/californiaConfig.js',
    './src/data/california/californiaJourneys.json',
    './src/data/california/californiaOsm.js',
    './src/data/california/californiaPlaces.js',
    './src/data/california/californiaRegions.js',
    './src/data/california/californiaRoutes.js',
    './src/data/california/californiaStops.js',
    './src/data/california/californiaTrips.js',
    './src/data/california/californiaUserLocations.json',
    './src/data/california/californiaUsers.js',
    './src/data/california/californiaRoutings.json',
    './src/data/current/currentConfig.js',
    './src/data/default/defaultConfig.js',
    './src/data/default/defaultUsers.js',
    './src/data/default/routeTypes.js',
    './src/data/default/services.js',
    './src/data/default/stopTypes.js',
    './src/data/samples/global-sample/globalSampleConfig.js',
    './src/data/samples/oakland-sample/oaklandCities.sample.json',
    './src/data/samples/oakland-sample/oaklandSampleConfig.js',
    './src/data/samples/oakland-sample/oaklandSampleData.js',
    './src/data/samples/oakland-sample/oaklandJourneys.sample.json',
    './src/data/samples/oakland-sample/oaklandOsm.sample.js',
    './src/data/samples/oakland-sample/oaklandPlaces.sample.js',
    './src/data/samples/oakland-sample/oaklandRegions.sample.js',
    './src/data/samples/oakland-sample/oaklandRoutes.sample.js',
    './src/data/samples/oakland-sample/oaklandStops.sample.js',
    './src/data/samples/oakland-sample/oaklandTrips.sample.js',
    './src/data/samples/oakland-sample/oaklandUserLocations.sample.json',
    './src/data/samples/oakland-sample/oaklandUsers.sample.js',
    './src/data/samples/oakland-sample/oaklandRoutings.sample.json',
    './src/data/samples/paris-sample/parisCities.sample.json',
    './src/data/samples/paris-sample/parisSampleConfig.js',
    './src/data/samples/paris-sample/parisJourneys.sample.json',
    './src/data/samples/paris-sample/parisOsm.sample.js',
    './src/data/samples/paris-sample/parisPlaces.sample.js',
    './src/data/samples/paris-sample/parisRegions.sample.js',
    './src/data/samples/paris-sample/parisRoutes.sample.js',
    './src/data/samples/paris-sample/parisStops.sample.js',
    './src/data/samples/paris-sample/parisTrips.sample.js',
    './src/data/samples/paris-sample/parisUserLocations.sample.json',
    './src/data/samples/paris-sample/parisUsers.sample.js',
    './src/data/samples/paris-sample/parisRoutings.sample.json',
    './src/data/samples/sampleConfig.js',
    './src/data/dataCreationHelpers.js',
    './src/data/dataQueryHelpers.js',
    './src/data/initialState.js'
  ],
  plugins: [
    json({
      exclude: 'node_modules/**'
    }),
    // Automatically exclude dependencies and peerDependencies from cjs and es builds, (and excludes
    // peerDependencies from all builds)
    autoExternal()
  ],
  experimentalCodeSplitting: true
};

if (env === 'es' || env === 'cjs') {
  config.output = {
    dir: env,
    format: env,
    sourcemap: 'inline'
  };
  // folktale needs to be explicitly external because rollup can't
  // match folktale to folktale/concurrency/task
  // enzyme and enzyme-wait are dev-dependencies that are used by componentTestHelpers, so mark external here
  config.external = ['symbol-observable', 'folktale/concurrency/task', 'enzyme', 'enzyme-wait'];
  config.plugins.push(
    babel({
      runtimeHelpers: true,
      exclude: ['node_modules/**'],
      plugins: ['external-helpers']
    })
  );
}

if (env === 'development' || env === 'production') {
  config.output = {
    dir: 'umd',
    format: 'umd',
    name: 'Umd',
    indent: false
  };
  config.plugins.push(
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  );
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

export default config;