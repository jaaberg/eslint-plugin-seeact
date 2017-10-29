/**
 * @fileoverview You see a problem, act upon it. 
 * @author Jørgen Aaberg
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = {
  'no-access-state-in-setstate': require('./rules/no-access-state-in-setstate'),
};

module.exports.configs = {
  recommended: {
    env: {
      es6: true,
      node: true,
    },
    parserOptions: {
      ecmaVersion: 6,
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      'seeact/no-access-state-in-setstate': 2,
    },
  },
};

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules');
