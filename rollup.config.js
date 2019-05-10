import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import {terser} from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import * as R from 'ramda';

const config = {
  input: [
    './src/index.js',
    './src/privateConfig.js',
    './src/data/belgium/belgiumCities.js',
    './src/data/belgium/belgiumConfig.js',
    './src/data/belgium/belgiumJourneys.js',
    './src/data/belgium/belgiumOsm.js',
    './src/data/belgium/belgiumPlaces.js',
    './src/data/belgium/belgiumRegions.js',
    './src/data/belgium/belgiumRoutes.js',
    './src/data/belgium/belgiumSankeySample.js',
    './src/data/belgium/belgiumSankeySample.spec.js',
    './src/data/belgium/belgiumStops.js',
    './src/data/belgium/belgiumTrips.js',
    './src/data/belgium/belgiumUserLocations.js',
    './src/data/belgium/belgiumUsers.js',
    './src/data/belgium/belgiumRoutings.js',
    './src/data/california/californiaCities.js',
    './src/data/california/californiaConfig.js',
    './src/data/california/californiaJourneys.js',
    './src/data/california/californiaOsm.js',
    './src/data/california/californiaPlaces.js',
    './src/data/california/californiaRegions.js',
    './src/data/california/californiaRoutes.js',
    './src/data/california/californiaStops.js',
    './src/data/california/californiaTrips.js',
    './src/data/california/californiaUserLocations.js',
    './src/data/california/californiaUsers.js',
    './src/data/california/californiaRoutings.js',
    './src/data/current/currentConfig.js',
    './src/data/default/templateUsers.js',
    './src/data/default/templateRegion.js',
    './src/data/default/routeTypes.js',
    './src/data/default/services.js',
    './src/data/default/stopTypes.js',
    './src/data/samples/global-sample/globalSampleConfig.js',
    './src/data/samples/oakland-sample/oaklandCities.sample.js',
    './src/data/samples/oakland-sample/oaklandSampleConfig.js',
    './src/data/samples/oakland-sample/oaklandSampleData.js',
    './src/data/samples/oakland-sample/oaklandJourneys.sample.js',
    './src/data/samples/oakland-sample/oaklandOsm.sample.js',
    './src/data/samples/oakland-sample/oaklandPlaces.sample.js',
    './src/data/samples/oakland-sample/oaklandRegions.sample.js',
    './src/data/samples/oakland-sample/oaklandRoutes.sample.js',
    './src/data/samples/oakland-sample/oaklandStops.sample.js',
    './src/data/samples/oakland-sample/oaklandTrips.sample.js',
    './src/data/samples/oakland-sample/oaklandUserLocations.sample.js',
    './src/data/samples/oakland-sample/oaklandUsers.sample.js',
    './src/data/samples/oakland-sample/oaklandRoutings.sample.js',
    './src/data/samples/paris-sample/parisCities.sample.js',
    './src/data/samples/paris-sample/parisSampleConfig.js',
    './src/data/samples/paris-sample/parisJourneys.sample.js',
    './src/data/samples/paris-sample/parisOsm.sample.js',
    './src/data/samples/paris-sample/parisPlaces.sample.js',
    './src/data/samples/paris-sample/parisRegions.sample.js',
    './src/data/samples/paris-sample/parisRoutes.sample.js',
    './src/data/samples/paris-sample/parisStops.sample.js',
    './src/data/samples/paris-sample/parisTrips.sample.js',
    './src/data/samples/paris-sample/parisUserLocations.sample.js',
    './src/data/samples/paris-sample/parisUsers.sample.js',
    './src/data/samples/paris-sample/parisRoutings.sample.js',
    './src/data/samples/sampleConfig.js',
    './src/data/dataCreationHelpers.js',
    './src/data/dataQueryHelpers.js',
    './src/data/initialState.js',
    './src/sampleSchema/simpleResolvers.js',
    './src/sampleSchema/schema.js'
  ],
  plugins: []
};
const externals = ['symbol-observable', 'folktale/concurrency/task', 'folktale/result'];

const configs = R.map(c => {
  const x = R.merge(config, c);
  //console.warn(x);
  return x;
}, [
  // CommonJS
  {
    output: {
      dir: 'lib',
      format: 'cjs',
      indent: true,
      sourcemap: true
    },
    external: [
      ...externals,
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: R.concat(config.plugins, [
      commonjs({
        'node_modules/folktale/result/index.js': ['Result', 'Error', 'Ok'],
        'node_modules/folktale/concurrency/task/index.js': ['task', 'rejected', 'of']
      }),
      babel()
    ])
  },
  // ES
  {
    output: {
      dir: 'esm',
      format: 'esm',
      indent: true,
      sourcemap: true
    },
    external: [
      ...externals,
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: R.concat(config.plugins, [
      nodeResolve({}), babel()
    ])
  },

  // ES for Browsers
  {
    output: {
      dir: 'esm',
      chunkFileNames: "[name]-[hash].mjs",
      entryFileNames: "[name].mjs",
      format: 'esm',
      indent: true,
      sourcemap: true
    },
    external: [
      ...externals,
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: R.concat(config.plugins, [
      nodeResolve({}),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ])
  }
]);
export default configs;