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

import {sampleSimpleResolvedSchema} from './simpleResolvers';
import {graphql} from 'graphql';
import * as R from 'ramda';
import {mapped} from 'ramda-lens';
import privateConfig from '../privateConfig'
import {getCurrentConfig} from '../data/current';

describe('mockExecutableSchema', () => {
  test('sampleSimpleResolvedSchema', async () => {
    expect(sampleSimpleResolvedSchema(privateConfig)).toMatchSnapshot();
    const query = `
        query allRegions {
            regions {
                id
            },
        }
    `;

    const schemaRegionLens = R.compose(R.lensPath(['data', 'regions'], mapped, R.lensProp('id')));
    const sampleRegionLens = R.compose(R.lensPath(['regions'], mapped, R.lensProp('id')));
    const regions = await graphql(sampleSimpleResolvedSchema(privateConfig), query).then(
      result => R.view(schemaRegionLens, result)
    );
    expect(regions).toEqual(
      R.map(R.pick(['id']), R.values(R.view(sampleRegionLens, getCurrentConfig(privateConfig))))
    );
  });
});
