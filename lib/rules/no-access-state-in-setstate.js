/**
 * @fileoverview Prevent usage of this.state within setState
 * @author Jørgen Aaberg
 */

'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Reports when this.state is accessed within setState',
      category: 'Possible Errors',
      recommended: false,
    },
  },

  create: function(context) {
    function isSetStateCall(node) {
      return (
        node.type === 'CallExpression' &&
        node.callee.property &&
        node.callee.property.name === 'setState' &&
        node.callee.object.type === 'ThisExpression'
      );
    }

    // The methods array contains all methods or functions that are using this.state
    // or that are calling another method or function using this.state
    const methods = [];
    // The vars array contains all variables that contains this.state
    const vars = [];
    return {
      CallExpression: function(node) {
        // Appends all the methods that are calling another
        // method containg this.state to the methods array
        methods.map(function(method) {
          if (node.callee.name === method.methodName) {
            var curr = node.parent;
            while (curr.type !== 'Program') {
              if (curr.type === 'MethodDefinition') {
                methods.push({
                  methodName: curr.key.name,
                  node: method.node,
                });
                break;
              }
              curr = curr.parent;
            }
          }
        });

        // Finding all CallExpressions that is inside a setState
        // to further check if they contains this.state
        var current = node.parent;
        while (current.type !== 'Program') {
          if (isSetStateCall(current)) {
            const methodName = node.callee.name;
            methods.map(function(method) {
              if (method.methodName === methodName) {
                context.report(
                  method.node,
                  'Use callback in setState when referencing the previous state.'
                );
              }
            });

            break;
          }
          current = current.parent;
        }
      },

      MemberExpression: function(node) {
        if (
          node.property.name === 'state' &&
          node.object.type === 'ThisExpression'
        ) {
          var current = node;
          while (current.type !== 'Program') {
            // Reporting if this.state is directly within this.setState
            if (isSetStateCall(current)) {
              context.report(
                node,
                'Use callback in setState when referencing the previous state.'
              );
              break;
            }

            // Storing all functions and methods that contains this.state
            if (current.type === 'MethodDefinition') {
              methods.push({
                methodName: current.key.name,
                node: node,
              });
              break;
            } else if (current.type === 'FunctionExpression') {
              methods.push({
                methodName: current.parent.key.name,
                node: node,
              });
              break;
            }

            // Storing all variables containg this.state
            if (current.type === 'VariableDeclarator') {
              vars.push({
                node: node,
                scope: context.getScope(),
              });
              break;
            }

            current = current.parent;
          }
        }
      },

      Identifier: function(node) {
        // Checks if the identifier is a variable within an object
        var current = node;
        while (current.parent.type === 'BinaryExpression') {
          current = current.parent;
        }
        if (current.parent.value === current) {
          while (current.type !== 'Program') {
            if (isSetStateCall(current)) {
              vars
                .filter(function(v) {
                  return v.scope === context.getScope();
                })
                .map(function(v) {
                  return context.report(
                    v.node,
                    'Use callback in setState when referencing the previous state.'
                  );
                });
            }
            current = current.parent;
          }
        }
      },
    };
  },
};
