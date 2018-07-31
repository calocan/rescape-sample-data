import privateConfig from '../privateConfig.js';
import {mergeDeep} from 'rescape-ramda';

/**
 * Anything here related to the test environment can go here
 */
export const environmentConfig = mergeDeep(privateConfig, {
  settings: {
  }
});
