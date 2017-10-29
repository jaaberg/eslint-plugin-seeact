/**
 * @fileoverview Prevent usage of this.state within setState
 * @author Jørgen Aaberg
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-access-state-in-setstate');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true
  }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-access-state-in-setstate', rule, {
  valid: [{
    code: [
      'var Hello = React.createClass({',
      '  onClick: function() {',
      '    this.setState(state => ({value: state.value + 1}))',
      '  }',
      '});'
    ].join('\n'),
    parserOptions: parserOptions
  }, {
    code: [
      'var Hello = React.createClass({',
      '  multiplyValue: function(obj) {',
      '    return obj.value*2',
      '  },',
      '  onClick: function() {',
      '    var value = this.state.value',
      '    this.multiplyValue({ value: value })',
      '  }',
      '});'
    ].join('\n'),
    parserOptions: parserOptions
  }],

  invalid: [{
    code: [
      'var Hello = React.createClass({',
      '  onClick: function() {',
      '    this.setState({value: this.state.value + 1})',
      '  }',
      '});'
    ].join('\n'),
    parserOptions: parserOptions,
    errors: [{
      message: 'Use callback in setState when referencing the previous state.'
    }]
  }, {
    code: [
      'var Hello = React.createClass({',
      '  onClick: function() {',
      '    this.setState(() => ({value: this.state.value + 1}))',
      '  }',
      '});'
    ].join('\n'),
    parserOptions: parserOptions,
    errors: [{
      message: 'Use callback in setState when referencing the previous state.'
    }]
  }, {
    code: [
      'var Hello = React.createClass({',
      '  onClick: function() {',
      '    var nextValue = this.state.value + 1',
      '    this.setState({value: nextValue})',
      '  }',
      '});'
    ].join('\n'),
    parserOptions: parserOptions,
    errors: [{
      message: 'Use callback in setState when referencing the previous state.'
    }]
  }, {
    code: [
      'function nextState(state) {',
      '  return {value: state.value + 1}',
      '}',
      'var Hello = React.createClass({',
      '  onClick: function() {',
      '    this.setState(nextState(this.state))',
      '  }',
      '});'
    ].join('\n'),
    parserOptions: parserOptions,
    errors: [{
      message: 'Use callback in setState when referencing the previous state.'
    }]
  }, {
    code: [
      'var Hello = React.createClass({',
      '  nextState: function() {',
      '    return {value: this.state.value + 1}',
      '  },',
      '  onClick: function() {',
      '    this.setState(nextState())',
      '  }',
      '});'
    ].join('\n'),
    parserOptions: parserOptions,
    errors: [{
      message: 'Use callback in setState when referencing the previous state.'
    }]
  }]
});