import {applyRegionsToUsers} from 'rescape-helpers';
import {mergeDeep} from 'rescape-ramda';
import californiaRegions from './californiaRegions';
import users from './californiaUsers';

/**
 * Creates a sample config for California from the given config
 * @param {Object} config Defaults to environments/testConfig. Contains general values
 * @return {Object} The sample config for Oakland
 */
export const createCaliforniaConfig = config => {
  const regions = californiaRegions(config);
  mergeDeep(config, {
    regions: regions,
    // Give each users all regions for simplicity
    users: applyRegionsToUsers(regions, users(config))
  });
};