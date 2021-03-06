/**
 * Created by Andy Likuski on 2017.08.23
 * Copyright (c) 2017 Andy Likuski
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export const userTemplateKeys = {
  // Superuser (e.g. SoP staff)
  APP_ADMIN: 'app_admin',
  // Client with full control over their region(s)
  // Can edit region-level information, manage projects, etc.
  REGION_MANAGER: 'region_manager',
  // Can use functionality within specified regions
  // Can create projects
  REGION_USER: 'region_user',
  // Exploratory access to specified regions, no edit ability
  REGION_VISITOR: 'region_visitor'
};

export const permissions = {
  ADMINISTRATE: 'administrate',
  MANAGE: 'manage',
  USE: 'use',
  VISIT: 'visit'
};

/*
  User templates. Merge one of these into a user configuration
*/
export const templateUsers = [
  {
    templateKey: userTemplateKeys.APP_ADMIN,
    // Admin access to application
    permissions: [permissions.ADMINISTRATE],
    regions: {
      ids: {}
    }
  },
  {
    templateKey: userTemplateKeys.REGION_MANAGER,
    // Can manage regions listed in ids
    permissions: [permissions.MANAGE],
    regions: {}
  },
  {
    templateKey: userTemplateKeys.REGION_USER,
    // Can use regions listed in ids, creating projects, etc
    permissions: [permissions.USE],
    regions: {}
  },
  {
    templateKey: userTemplateKeys.REGION_VISITOR,
    // Can use regions listed in ids, creating projects, etc
    permissions: [permissions.VISIT],
    regions: {}
  }
];
