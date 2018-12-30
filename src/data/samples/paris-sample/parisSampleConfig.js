import regions from './parisRegions.sample';
import users from './parisUsers.sample';
import {applyRegionsToUsers} from 'rescape-helpers';
import * as R from 'ramda';

/**
 * Creates a sample config for Oakland from the given config
 * @param {Object} config Defaults to environments/testConfig. Contains general values
 * @return {Object} The sample config for Oakland
 */
export const parisSampleConfig = {
  regions,
  // Give each users of each rol access to all regions for simplicity
  users: R.map(applyRegionsToUsers(regions), users)
};
