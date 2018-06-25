import {environmentConfig} from '../../../environments/testConfig';
import regions from './parisRegions.sample'
import users from './parisUsers.sample'
import {mergeDeep} from 'rescape-ramda';
import {applyRegionsToUsers} from 'rescape-helpers';

/**
 * Creates a sample config for Oakland from the given config
 * @param {Object} config Defaults to environments/testConfig. Contains general values
 * @return {Object} The sample config for Oakland
 */
export const createParisSampleConfig = (config = environmentConfig) => mergeDeep(config, {
  regions,
  // Give each users all regions for simplicity
  users: applyRegionsToUsers(regions, users)
});
