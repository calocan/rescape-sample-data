import {applyRegionsToUsers} from 'rescape-helpers';
import regions from './californiaRegions';
import users from './californiaUsers';
import * as R from 'ramda'

/**
 * Creates a sample config for California from the given config
 * @param {Object} config Defaults to environments/testConfig. Contains general values
 * @return {Object} The sample config for Oakland
 */
export const createCaliforniaConfig = {
  regions,
  // Give each users of each rol access to all regions for simplicity
  users: R.map(applyRegionsToUsers(regions), users)
};