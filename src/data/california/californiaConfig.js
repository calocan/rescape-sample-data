import {environmentConfig} from 'environments/developmentConfig';
import {defaultConfig} from 'data/default/defaultConfig';
import {applyRegionsToUsers, firstUserLens} from 'rescape-helpers';
import {mergeDeep} from 'rescape-ramda';
import regions from './californiaRegions'
import users from './californiaUsers'

/**
 * Creates a sample config for California from the given config
 * @param {Object} config Defaults to environments/testConfig. Contains general values
 * @return {Object} The sample config for Oakland
 */
export const createCaliforniaConfig = (config = environmentConfig) => mergeDeep(config, {
  regions,
  // Give each users all regions for simplicity
  users: applyRegionsToUsers(regions, users)
});