/**
 * Created by Andy Likuski on 2017.11.29
 * Copyright (c) 2017 Andy Likuski
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {addResolveFunctionsToSchema} from 'graphql-tools';
import * as R from 'ramda';
import {reqPathThrowing} from 'rescape-ramda';
import createSchema from './schema';
import {getCurrentConfig} from '../data/current/currentConfig';

const objectValues = field => {
  return obj => {
    return R.values(reqPathThrowing([field], obj));
  };
};

// Original example from: https://github.com/apollographql/graphql-tools
const makeSimpleResolvers = data => ({
  //Operation: {},
  //Permission: {
  //  operations: objectValues('operations')
  //},
  User: {
    //permissions: objectValues('permissions')
  },
  Location: {
    features: objectValues('features')
  },
  Geojson: {
    features: objectValues('features')
  },
  Bounds: {},
  Geospatial: {},
  Viewport: {},
  Mapbox: {},
  Region: {
    // eslint-disable-next-line no-unused-vars
    name(obj, args) {
      return obj.name;
    }
  },
  MapboxSettings: {},
  ApiSettings: {},
  OverpassSettings: {},
  Settings: {},
  Query: {
    // These all ignore the query args and just return everything stupidly
    // eslint-disable-next-line no-unused-vars
    regions: (obj, args) => objectValues('regions')(data),
    // eslint-disable-next-line no-unused-vars
    users:  (obj, args) => objectValues('users')(data),
    // eslint-disable-next-line no-unused-vars
    settings: (obj, args) => objectValues('settings')(data)
  }
  /*
  Mutation: {
    upvotePost(_, { postId }) {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  */
});


/**
 * Modifies the given createSchema to add simple resolvers
 * @param {Object} schema A GraphlQL SchemaObject
 * @param {Object} data A full data structure that matches
 * the structure the createSchema
 * @returns {Object} The given GraphQLSchema with resolvers added
 */
export const createSimpleResolvedSchema = (schema, data) => {
  addResolveFunctionsToSchema({schema, resolvers: makeSimpleResolvers(data)});
  return schema;
};

/**
 * For internal use only
 * A sample schema using simple resolver based on the getCurrentConfig()
 * The current config is sample data based on the environment being test or development
 * @type {Object} The GraphQlSchema with resolvers added
 */
export const sampleSimpleResolvedSchema = config => createSimpleResolvedSchema(createSchema(), getCurrentConfig(config));

