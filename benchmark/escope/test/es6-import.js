'use strict';

var _chai = require('chai');

var _espree = require('../third_party/espree');

var _espree2 = _interopRequireDefault(_espree);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('import declaration', function () {
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-static-and-runtme-semantics-module-records
    it('should import names from source', function () {
        var ast = (0, _espree2.default)('import v from "mod";', { sourceType: 'module' });

        var scopeManager = (0, _.analyze)(ast, { ecmaVersion: 6, sourceType: 'module' });
        (0, _chai.expect)(scopeManager.scopes).to.have.length(2);
        var globalScope = scopeManager.scopes[0];
        (0, _chai.expect)(globalScope.type).to.be.equal('global');
        (0, _chai.expect)(globalScope.variables).to.have.length(0);
        (0, _chai.expect)(globalScope.references).to.have.length(0);

        var scope = scopeManager.scopes[1];
        (0, _chai.expect)(scope.type).to.be.equal('module');
        (0, _chai.expect)(scope.isStrict).to.be.true;
        (0, _chai.expect)(scope.variables).to.have.length(1);
        (0, _chai.expect)(scope.variables[0].name).to.be.equal('v');
        (0, _chai.expect)(scope.variables[0].defs[0].type).to.be.equal('ImportBinding');
        (0, _chai.expect)(scope.references).to.have.length(0);
    });

    it('should import namespaces', function () {
        var ast = (0, _espree2.default)('import * as ns from "mod";', { sourceType: 'module'
        });

        var scopeManager = (0, _.analyze)(ast, { ecmaVersion: 6, sourceType: 'module' });
        (0, _chai.expect)(scopeManager.scopes).to.have.length(2);
        var globalScope = scopeManager.scopes[0];
        (0, _chai.expect)(globalScope.type).to.be.equal('global');
        (0, _chai.expect)(globalScope.variables).to.have.length(0);
        (0, _chai.expect)(globalScope.references).to.have.length(0);

        var scope = scopeManager.scopes[1];
        (0, _chai.expect)(scope.type).to.be.equal('module');
        (0, _chai.expect)(scope.isStrict).to.be.true;
        (0, _chai.expect)(scope.variables).to.have.length(1);
        (0, _chai.expect)(scope.variables[0].name).to.be.equal('ns');
        (0, _chai.expect)(scope.variables[0].defs[0].type).to.be.equal('ImportBinding');
        (0, _chai.expect)(scope.references).to.have.length(0);
    });

    it('should import insided names#1', function () {
        var ast = (0, _espree2.default)('import {x} from "mod";', { sourceType: 'module'
        });

        var scopeManager = (0, _.analyze)(ast, { ecmaVersion: 6, sourceType: 'module' });
        (0, _chai.expect)(scopeManager.scopes).to.have.length(2);
        var globalScope = scopeManager.scopes[0];
        (0, _chai.expect)(globalScope.type).to.be.equal('global');
        (0, _chai.expect)(globalScope.variables).to.have.length(0);
        (0, _chai.expect)(globalScope.references).to.have.length(0);

        var scope = scopeManager.scopes[1];
        (0, _chai.expect)(scope.type).to.be.equal('module');
        (0, _chai.expect)(scope.isStrict).to.be.true;
        (0, _chai.expect)(scope.variables).to.have.length(1);
        (0, _chai.expect)(scope.variables[0].name).to.be.equal('x');
        (0, _chai.expect)(scope.variables[0].defs[0].type).to.be.equal('ImportBinding');
        (0, _chai.expect)(scope.references).to.have.length(0);
    });

    it('should import insided names#2', function () {
        var ast = (0, _espree2.default)('import {x as v} from "mod";', { sourceType: 'module' });

        var scopeManager = (0, _.analyze)(ast, { ecmaVersion: 6, sourceType: 'module' });
        (0, _chai.expect)(scopeManager.scopes).to.have.length(2);
        var globalScope = scopeManager.scopes[0];
        (0, _chai.expect)(globalScope.type).to.be.equal('global');
        (0, _chai.expect)(globalScope.variables).to.have.length(0);
        (0, _chai.expect)(globalScope.references).to.have.length(0);

        var scope = scopeManager.scopes[1];
        (0, _chai.expect)(scope.type).to.be.equal('module');
        (0, _chai.expect)(scope.isStrict).to.be.true;
        (0, _chai.expect)(scope.variables).to.have.length(1);
        (0, _chai.expect)(scope.variables[0].name).to.be.equal('v');
        (0, _chai.expect)(scope.variables[0].defs[0].type).to.be.equal('ImportBinding');
        (0, _chai.expect)(scope.references).to.have.length(0);
    });

    // TODO: Should parse it.
    // import from "mod";
});

// vim: set sw=4 ts=4 et tw=80 :
// -*- coding: utf-8 -*-
//  Copyright (C) 2014 Yusuke Suzuki <utatane.tea@gmail.com>
//
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//    * Redistributions of source code must retain the above copyright
//      notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
//  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
//  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
//  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
//  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
//  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi1pbXBvcnQuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJpdCIsImFzdCIsInNvdXJjZVR5cGUiLCJzY29wZU1hbmFnZXIiLCJlY21hVmVyc2lvbiIsInNjb3BlcyIsInRvIiwiaGF2ZSIsImxlbmd0aCIsImdsb2JhbFNjb3BlIiwidHlwZSIsImJlIiwiZXF1YWwiLCJ2YXJpYWJsZXMiLCJyZWZlcmVuY2VzIiwic2NvcGUiLCJpc1N0cmljdCIsInRydWUiLCJuYW1lIiwiZGVmcyJdLCJtYXBwaW5ncyI6Ijs7QUF1QkE7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBQSxTQUFTLG9CQUFULEVBQStCLFlBQVc7QUFDdEM7QUFDQUMsT0FBRyxpQ0FBSCxFQUFzQyxZQUFXO0FBQzdDLFlBQU1DLE1BQU0sOENBQStCLEVBQUNDLFlBQVksUUFBYixFQUEvQixDQUFaOztBQUVBLFlBQU1DLGVBQWUsZUFBUUYsR0FBUixFQUFhLEVBQUNHLGFBQWEsQ0FBZCxFQUFpQkYsWUFBWSxRQUE3QixFQUFiLENBQXJCO0FBQ0EsMEJBQU9DLGFBQWFFLE1BQXBCLEVBQTRCQyxFQUE1QixDQUErQkMsSUFBL0IsQ0FBb0NDLE1BQXBDLENBQTJDLENBQTNDO0FBQ0EsWUFBTUMsY0FBY04sYUFBYUUsTUFBYixDQUFvQixDQUFwQixDQUFwQjtBQUNBLDBCQUFPSSxZQUFZQyxJQUFuQixFQUF5QkosRUFBekIsQ0FBNEJLLEVBQTVCLENBQStCQyxLQUEvQixDQUFxQyxRQUFyQztBQUNBLDBCQUFPSCxZQUFZSSxTQUFuQixFQUE4QlAsRUFBOUIsQ0FBaUNDLElBQWpDLENBQXNDQyxNQUF0QyxDQUE2QyxDQUE3QztBQUNBLDBCQUFPQyxZQUFZSyxVQUFuQixFQUErQlIsRUFBL0IsQ0FBa0NDLElBQWxDLENBQXVDQyxNQUF2QyxDQUE4QyxDQUE5Qzs7QUFFQSxZQUFNTyxRQUFRWixhQUFhRSxNQUFiLENBQW9CLENBQXBCLENBQWQ7QUFDQSwwQkFBT1UsTUFBTUwsSUFBYixFQUFtQkosRUFBbkIsQ0FBc0JLLEVBQXRCLENBQXlCQyxLQUF6QixDQUErQixRQUEvQjtBQUNBLDBCQUFPRyxNQUFNQyxRQUFiLEVBQXVCVixFQUF2QixDQUEwQkssRUFBMUIsQ0FBNkJNLElBQTdCO0FBQ0EsMEJBQU9GLE1BQU1GLFNBQWIsRUFBd0JQLEVBQXhCLENBQTJCQyxJQUEzQixDQUFnQ0MsTUFBaEMsQ0FBdUMsQ0FBdkM7QUFDQSwwQkFBT08sTUFBTUYsU0FBTixDQUFnQixDQUFoQixFQUFtQkssSUFBMUIsRUFBZ0NaLEVBQWhDLENBQW1DSyxFQUFuQyxDQUFzQ0MsS0FBdEMsQ0FBNEMsR0FBNUM7QUFDQSwwQkFBT0csTUFBTUYsU0FBTixDQUFnQixDQUFoQixFQUFtQk0sSUFBbkIsQ0FBd0IsQ0FBeEIsRUFBMkJULElBQWxDLEVBQXdDSixFQUF4QyxDQUEyQ0ssRUFBM0MsQ0FBOENDLEtBQTlDLENBQW9ELGVBQXBEO0FBQ0EsMEJBQU9HLE1BQU1ELFVBQWIsRUFBeUJSLEVBQXpCLENBQTRCQyxJQUE1QixDQUFpQ0MsTUFBakMsQ0FBd0MsQ0FBeEM7QUFDSCxLQWpCRDs7QUFtQkFSLE9BQUcsMEJBQUgsRUFBK0IsWUFBVztBQUN0QyxZQUFNQyxNQUFNLG9EQUFzQyxFQUFDQyxZQUFZO0FBQWIsU0FBdEMsQ0FBWjs7QUFHQSxZQUFNQyxlQUFlLGVBQVFGLEdBQVIsRUFBYSxFQUFDRyxhQUFhLENBQWQsRUFBaUJGLFlBQVksUUFBN0IsRUFBYixDQUFyQjtBQUNBLDBCQUFPQyxhQUFhRSxNQUFwQixFQUE0QkMsRUFBNUIsQ0FBK0JDLElBQS9CLENBQW9DQyxNQUFwQyxDQUEyQyxDQUEzQztBQUNBLFlBQU1DLGNBQWNOLGFBQWFFLE1BQWIsQ0FBb0IsQ0FBcEIsQ0FBcEI7QUFDQSwwQkFBT0ksWUFBWUMsSUFBbkIsRUFBeUJKLEVBQXpCLENBQTRCSyxFQUE1QixDQUErQkMsS0FBL0IsQ0FBcUMsUUFBckM7QUFDQSwwQkFBT0gsWUFBWUksU0FBbkIsRUFBOEJQLEVBQTlCLENBQWlDQyxJQUFqQyxDQUFzQ0MsTUFBdEMsQ0FBNkMsQ0FBN0M7QUFDQSwwQkFBT0MsWUFBWUssVUFBbkIsRUFBK0JSLEVBQS9CLENBQWtDQyxJQUFsQyxDQUF1Q0MsTUFBdkMsQ0FBOEMsQ0FBOUM7O0FBRUEsWUFBTU8sUUFBUVosYUFBYUUsTUFBYixDQUFvQixDQUFwQixDQUFkO0FBQ0EsMEJBQU9VLE1BQU1MLElBQWIsRUFBbUJKLEVBQW5CLENBQXNCSyxFQUF0QixDQUF5QkMsS0FBekIsQ0FBK0IsUUFBL0I7QUFDQSwwQkFBT0csTUFBTUMsUUFBYixFQUF1QlYsRUFBdkIsQ0FBMEJLLEVBQTFCLENBQTZCTSxJQUE3QjtBQUNBLDBCQUFPRixNQUFNRixTQUFiLEVBQXdCUCxFQUF4QixDQUEyQkMsSUFBM0IsQ0FBZ0NDLE1BQWhDLENBQXVDLENBQXZDO0FBQ0EsMEJBQU9PLE1BQU1GLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBbUJLLElBQTFCLEVBQWdDWixFQUFoQyxDQUFtQ0ssRUFBbkMsQ0FBc0NDLEtBQXRDLENBQTRDLElBQTVDO0FBQ0EsMEJBQU9HLE1BQU1GLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBbUJNLElBQW5CLENBQXdCLENBQXhCLEVBQTJCVCxJQUFsQyxFQUF3Q0osRUFBeEMsQ0FBMkNLLEVBQTNDLENBQThDQyxLQUE5QyxDQUFvRCxlQUFwRDtBQUNBLDBCQUFPRyxNQUFNRCxVQUFiLEVBQXlCUixFQUF6QixDQUE0QkMsSUFBNUIsQ0FBaUNDLE1BQWpDLENBQXdDLENBQXhDO0FBQ0gsS0FsQkQ7O0FBb0JBUixPQUFHLCtCQUFILEVBQW9DLFlBQVc7QUFDM0MsWUFBTUMsTUFBTSxnREFBaUMsRUFBQ0MsWUFBWTtBQUFiLFNBQWpDLENBQVo7O0FBR0EsWUFBTUMsZUFBZSxlQUFRRixHQUFSLEVBQWEsRUFBQ0csYUFBYSxDQUFkLEVBQWlCRixZQUFZLFFBQTdCLEVBQWIsQ0FBckI7QUFDQSwwQkFBT0MsYUFBYUUsTUFBcEIsRUFBNEJDLEVBQTVCLENBQStCQyxJQUEvQixDQUFvQ0MsTUFBcEMsQ0FBMkMsQ0FBM0M7QUFDQSxZQUFNQyxjQUFjTixhQUFhRSxNQUFiLENBQW9CLENBQXBCLENBQXBCO0FBQ0EsMEJBQU9JLFlBQVlDLElBQW5CLEVBQXlCSixFQUF6QixDQUE0QkssRUFBNUIsQ0FBK0JDLEtBQS9CLENBQXFDLFFBQXJDO0FBQ0EsMEJBQU9ILFlBQVlJLFNBQW5CLEVBQThCUCxFQUE5QixDQUFpQ0MsSUFBakMsQ0FBc0NDLE1BQXRDLENBQTZDLENBQTdDO0FBQ0EsMEJBQU9DLFlBQVlLLFVBQW5CLEVBQStCUixFQUEvQixDQUFrQ0MsSUFBbEMsQ0FBdUNDLE1BQXZDLENBQThDLENBQTlDOztBQUVBLFlBQU1PLFFBQVFaLGFBQWFFLE1BQWIsQ0FBb0IsQ0FBcEIsQ0FBZDtBQUNBLDBCQUFPVSxNQUFNTCxJQUFiLEVBQW1CSixFQUFuQixDQUFzQkssRUFBdEIsQ0FBeUJDLEtBQXpCLENBQStCLFFBQS9CO0FBQ0EsMEJBQU9HLE1BQU1DLFFBQWIsRUFBdUJWLEVBQXZCLENBQTBCSyxFQUExQixDQUE2Qk0sSUFBN0I7QUFDQSwwQkFBT0YsTUFBTUYsU0FBYixFQUF3QlAsRUFBeEIsQ0FBMkJDLElBQTNCLENBQWdDQyxNQUFoQyxDQUF1QyxDQUF2QztBQUNBLDBCQUFPTyxNQUFNRixTQUFOLENBQWdCLENBQWhCLEVBQW1CSyxJQUExQixFQUFnQ1osRUFBaEMsQ0FBbUNLLEVBQW5DLENBQXNDQyxLQUF0QyxDQUE0QyxHQUE1QztBQUNBLDBCQUFPRyxNQUFNRixTQUFOLENBQWdCLENBQWhCLEVBQW1CTSxJQUFuQixDQUF3QixDQUF4QixFQUEyQlQsSUFBbEMsRUFBd0NKLEVBQXhDLENBQTJDSyxFQUEzQyxDQUE4Q0MsS0FBOUMsQ0FBb0QsZUFBcEQ7QUFDQSwwQkFBT0csTUFBTUQsVUFBYixFQUF5QlIsRUFBekIsQ0FBNEJDLElBQTVCLENBQWlDQyxNQUFqQyxDQUF3QyxDQUF4QztBQUNILEtBbEJEOztBQW9CQVIsT0FBRywrQkFBSCxFQUFvQyxZQUFXO0FBQzNDLFlBQU1DLE1BQU0scURBQXNDLEVBQUNDLFlBQVksUUFBYixFQUF0QyxDQUFaOztBQUVBLFlBQU1DLGVBQWUsZUFBUUYsR0FBUixFQUFhLEVBQUNHLGFBQWEsQ0FBZCxFQUFpQkYsWUFBWSxRQUE3QixFQUFiLENBQXJCO0FBQ0EsMEJBQU9DLGFBQWFFLE1BQXBCLEVBQTRCQyxFQUE1QixDQUErQkMsSUFBL0IsQ0FBb0NDLE1BQXBDLENBQTJDLENBQTNDO0FBQ0EsWUFBTUMsY0FBY04sYUFBYUUsTUFBYixDQUFvQixDQUFwQixDQUFwQjtBQUNBLDBCQUFPSSxZQUFZQyxJQUFuQixFQUF5QkosRUFBekIsQ0FBNEJLLEVBQTVCLENBQStCQyxLQUEvQixDQUFxQyxRQUFyQztBQUNBLDBCQUFPSCxZQUFZSSxTQUFuQixFQUE4QlAsRUFBOUIsQ0FBaUNDLElBQWpDLENBQXNDQyxNQUF0QyxDQUE2QyxDQUE3QztBQUNBLDBCQUFPQyxZQUFZSyxVQUFuQixFQUErQlIsRUFBL0IsQ0FBa0NDLElBQWxDLENBQXVDQyxNQUF2QyxDQUE4QyxDQUE5Qzs7QUFFQSxZQUFNTyxRQUFRWixhQUFhRSxNQUFiLENBQW9CLENBQXBCLENBQWQ7QUFDQSwwQkFBT1UsTUFBTUwsSUFBYixFQUFtQkosRUFBbkIsQ0FBc0JLLEVBQXRCLENBQXlCQyxLQUF6QixDQUErQixRQUEvQjtBQUNBLDBCQUFPRyxNQUFNQyxRQUFiLEVBQXVCVixFQUF2QixDQUEwQkssRUFBMUIsQ0FBNkJNLElBQTdCO0FBQ0EsMEJBQU9GLE1BQU1GLFNBQWIsRUFBd0JQLEVBQXhCLENBQTJCQyxJQUEzQixDQUFnQ0MsTUFBaEMsQ0FBdUMsQ0FBdkM7QUFDQSwwQkFBT08sTUFBTUYsU0FBTixDQUFnQixDQUFoQixFQUFtQkssSUFBMUIsRUFBZ0NaLEVBQWhDLENBQW1DSyxFQUFuQyxDQUFzQ0MsS0FBdEMsQ0FBNEMsR0FBNUM7QUFDQSwwQkFBT0csTUFBTUYsU0FBTixDQUFnQixDQUFoQixFQUFtQk0sSUFBbkIsQ0FBd0IsQ0FBeEIsRUFBMkJULElBQWxDLEVBQXdDSixFQUF4QyxDQUEyQ0ssRUFBM0MsQ0FBOENDLEtBQTlDLENBQW9ELGVBQXBEO0FBQ0EsMEJBQU9HLE1BQU1ELFVBQWIsRUFBeUJSLEVBQXpCLENBQTRCQyxJQUE1QixDQUFpQ0MsTUFBakMsQ0FBd0MsQ0FBeEM7QUFDSCxLQWpCRDs7QUFtQkE7QUFDQTtBQUNILENBbEZEOztBQW9GQTtBQS9HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJlczYtaW1wb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gLSotIGNvZGluZzogdXRmLTggLSotXG4vLyAgQ29weXJpZ2h0IChDKSAyMDE0IFl1c3VrZSBTdXp1a2kgPHV0YXRhbmUudGVhQGdtYWlsLmNvbT5cbi8vXG4vLyAgUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4vLyAgbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4vL1xuLy8gICAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuLy8gICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4vLyAgICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0XG4vLyAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGVcbi8vICAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbi8vXG4vLyAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbi8vICBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4vLyAgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0Vcbi8vICBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgPENPUFlSSUdIVCBIT0xERVI+IEJFIExJQUJMRSBGT1IgQU5ZXG4vLyAgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbi8vICAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG4vLyAgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EXG4vLyAgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbi8vICAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0Zcbi8vICBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuXG5pbXBvcnQgeyBleHBlY3QgfSBmcm9tICdjaGFpJztcbmltcG9ydCBlc3ByZWUgZnJvbSAnLi4vdGhpcmRfcGFydHkvZXNwcmVlJztcbmltcG9ydCB7IGFuYWx5emUgfSBmcm9tICcuLic7XG5cbmRlc2NyaWJlKCdpbXBvcnQgZGVjbGFyYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBodHRwOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1zdGF0aWMtYW5kLXJ1bnRtZS1zZW1hbnRpY3MtbW9kdWxlLXJlY29yZHNcbiAgICBpdCgnc2hvdWxkIGltcG9ydCBuYW1lcyBmcm9tIHNvdXJjZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBhc3QgPSBlc3ByZWUoYGltcG9ydCB2IGZyb20gXCJtb2RcIjtgLCB7c291cmNlVHlwZTogJ21vZHVsZSd9KTtcblxuICAgICAgICBjb25zdCBzY29wZU1hbmFnZXIgPSBhbmFseXplKGFzdCwge2VjbWFWZXJzaW9uOiA2LCBzb3VyY2VUeXBlOiAnbW9kdWxlJ30pO1xuICAgICAgICBleHBlY3Qoc2NvcGVNYW5hZ2VyLnNjb3BlcykudG8uaGF2ZS5sZW5ndGgoMik7XG4gICAgICAgIGNvbnN0IGdsb2JhbFNjb3BlID0gc2NvcGVNYW5hZ2VyLnNjb3Blc1swXTtcbiAgICAgICAgZXhwZWN0KGdsb2JhbFNjb3BlLnR5cGUpLnRvLmJlLmVxdWFsKCdnbG9iYWwnKTtcbiAgICAgICAgZXhwZWN0KGdsb2JhbFNjb3BlLnZhcmlhYmxlcykudG8uaGF2ZS5sZW5ndGgoMCk7XG4gICAgICAgIGV4cGVjdChnbG9iYWxTY29wZS5yZWZlcmVuY2VzKS50by5oYXZlLmxlbmd0aCgwKTtcblxuICAgICAgICBjb25zdCBzY29wZSA9IHNjb3BlTWFuYWdlci5zY29wZXNbMV07XG4gICAgICAgIGV4cGVjdChzY29wZS50eXBlKS50by5iZS5lcXVhbCgnbW9kdWxlJyk7XG4gICAgICAgIGV4cGVjdChzY29wZS5pc1N0cmljdCkudG8uYmUudHJ1ZTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLnZhcmlhYmxlcykudG8uaGF2ZS5sZW5ndGgoMSk7XG4gICAgICAgIGV4cGVjdChzY29wZS52YXJpYWJsZXNbMF0ubmFtZSkudG8uYmUuZXF1YWwoJ3YnKTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLnZhcmlhYmxlc1swXS5kZWZzWzBdLnR5cGUpLnRvLmJlLmVxdWFsKCdJbXBvcnRCaW5kaW5nJyk7XG4gICAgICAgIGV4cGVjdChzY29wZS5yZWZlcmVuY2VzKS50by5oYXZlLmxlbmd0aCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaW1wb3J0IG5hbWVzcGFjZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgYXN0ID0gZXNwcmVlKCBgaW1wb3J0ICogYXMgbnMgZnJvbSBcIm1vZFwiO2AsIHtzb3VyY2VUeXBlOiAnbW9kdWxlJ1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzY29wZU1hbmFnZXIgPSBhbmFseXplKGFzdCwge2VjbWFWZXJzaW9uOiA2LCBzb3VyY2VUeXBlOiAnbW9kdWxlJ30pO1xuICAgICAgICBleHBlY3Qoc2NvcGVNYW5hZ2VyLnNjb3BlcykudG8uaGF2ZS5sZW5ndGgoMik7XG4gICAgICAgIGNvbnN0IGdsb2JhbFNjb3BlID0gc2NvcGVNYW5hZ2VyLnNjb3Blc1swXTtcbiAgICAgICAgZXhwZWN0KGdsb2JhbFNjb3BlLnR5cGUpLnRvLmJlLmVxdWFsKCdnbG9iYWwnKTtcbiAgICAgICAgZXhwZWN0KGdsb2JhbFNjb3BlLnZhcmlhYmxlcykudG8uaGF2ZS5sZW5ndGgoMCk7XG4gICAgICAgIGV4cGVjdChnbG9iYWxTY29wZS5yZWZlcmVuY2VzKS50by5oYXZlLmxlbmd0aCgwKTtcblxuICAgICAgICBjb25zdCBzY29wZSA9IHNjb3BlTWFuYWdlci5zY29wZXNbMV07XG4gICAgICAgIGV4cGVjdChzY29wZS50eXBlKS50by5iZS5lcXVhbCgnbW9kdWxlJyk7XG4gICAgICAgIGV4cGVjdChzY29wZS5pc1N0cmljdCkudG8uYmUudHJ1ZTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLnZhcmlhYmxlcykudG8uaGF2ZS5sZW5ndGgoMSk7XG4gICAgICAgIGV4cGVjdChzY29wZS52YXJpYWJsZXNbMF0ubmFtZSkudG8uYmUuZXF1YWwoJ25zJyk7XG4gICAgICAgIGV4cGVjdChzY29wZS52YXJpYWJsZXNbMF0uZGVmc1swXS50eXBlKS50by5iZS5lcXVhbCgnSW1wb3J0QmluZGluZycpO1xuICAgICAgICBleHBlY3Qoc2NvcGUucmVmZXJlbmNlcykudG8uaGF2ZS5sZW5ndGgoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGltcG9ydCBpbnNpZGVkIG5hbWVzIzEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgYXN0ID0gZXNwcmVlKGBpbXBvcnQge3h9IGZyb20gXCJtb2RcIjtgLCB7c291cmNlVHlwZTogJ21vZHVsZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc2NvcGVNYW5hZ2VyID0gYW5hbHl6ZShhc3QsIHtlY21hVmVyc2lvbjogNiwgc291cmNlVHlwZTogJ21vZHVsZSd9KTtcbiAgICAgICAgZXhwZWN0KHNjb3BlTWFuYWdlci5zY29wZXMpLnRvLmhhdmUubGVuZ3RoKDIpO1xuICAgICAgICBjb25zdCBnbG9iYWxTY29wZSA9IHNjb3BlTWFuYWdlci5zY29wZXNbMF07XG4gICAgICAgIGV4cGVjdChnbG9iYWxTY29wZS50eXBlKS50by5iZS5lcXVhbCgnZ2xvYmFsJyk7XG4gICAgICAgIGV4cGVjdChnbG9iYWxTY29wZS52YXJpYWJsZXMpLnRvLmhhdmUubGVuZ3RoKDApO1xuICAgICAgICBleHBlY3QoZ2xvYmFsU2NvcGUucmVmZXJlbmNlcykudG8uaGF2ZS5sZW5ndGgoMCk7XG5cbiAgICAgICAgY29uc3Qgc2NvcGUgPSBzY29wZU1hbmFnZXIuc2NvcGVzWzFdO1xuICAgICAgICBleHBlY3Qoc2NvcGUudHlwZSkudG8uYmUuZXF1YWwoJ21vZHVsZScpO1xuICAgICAgICBleHBlY3Qoc2NvcGUuaXNTdHJpY3QpLnRvLmJlLnRydWU7XG4gICAgICAgIGV4cGVjdChzY29wZS52YXJpYWJsZXMpLnRvLmhhdmUubGVuZ3RoKDEpO1xuICAgICAgICBleHBlY3Qoc2NvcGUudmFyaWFibGVzWzBdLm5hbWUpLnRvLmJlLmVxdWFsKCd4Jyk7XG4gICAgICAgIGV4cGVjdChzY29wZS52YXJpYWJsZXNbMF0uZGVmc1swXS50eXBlKS50by5iZS5lcXVhbCgnSW1wb3J0QmluZGluZycpO1xuICAgICAgICBleHBlY3Qoc2NvcGUucmVmZXJlbmNlcykudG8uaGF2ZS5sZW5ndGgoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGltcG9ydCBpbnNpZGVkIG5hbWVzIzInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgYXN0ID0gZXNwcmVlKGBpbXBvcnQge3ggYXMgdn0gZnJvbSBcIm1vZFwiO2AsIHtzb3VyY2VUeXBlOiAnbW9kdWxlJ30pO1xuXG4gICAgICAgIGNvbnN0IHNjb3BlTWFuYWdlciA9IGFuYWx5emUoYXN0LCB7ZWNtYVZlcnNpb246IDYsIHNvdXJjZVR5cGU6ICdtb2R1bGUnfSk7XG4gICAgICAgIGV4cGVjdChzY29wZU1hbmFnZXIuc2NvcGVzKS50by5oYXZlLmxlbmd0aCgyKTtcbiAgICAgICAgY29uc3QgZ2xvYmFsU2NvcGUgPSBzY29wZU1hbmFnZXIuc2NvcGVzWzBdO1xuICAgICAgICBleHBlY3QoZ2xvYmFsU2NvcGUudHlwZSkudG8uYmUuZXF1YWwoJ2dsb2JhbCcpO1xuICAgICAgICBleHBlY3QoZ2xvYmFsU2NvcGUudmFyaWFibGVzKS50by5oYXZlLmxlbmd0aCgwKTtcbiAgICAgICAgZXhwZWN0KGdsb2JhbFNjb3BlLnJlZmVyZW5jZXMpLnRvLmhhdmUubGVuZ3RoKDApO1xuXG4gICAgICAgIGNvbnN0IHNjb3BlID0gc2NvcGVNYW5hZ2VyLnNjb3Blc1sxXTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLnR5cGUpLnRvLmJlLmVxdWFsKCdtb2R1bGUnKTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLmlzU3RyaWN0KS50by5iZS50cnVlO1xuICAgICAgICBleHBlY3Qoc2NvcGUudmFyaWFibGVzKS50by5oYXZlLmxlbmd0aCgxKTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLnZhcmlhYmxlc1swXS5uYW1lKS50by5iZS5lcXVhbCgndicpO1xuICAgICAgICBleHBlY3Qoc2NvcGUudmFyaWFibGVzWzBdLmRlZnNbMF0udHlwZSkudG8uYmUuZXF1YWwoJ0ltcG9ydEJpbmRpbmcnKTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLnJlZmVyZW5jZXMpLnRvLmhhdmUubGVuZ3RoKDApO1xuICAgIH0pO1xuXG4gICAgLy8gVE9ETzogU2hvdWxkIHBhcnNlIGl0LlxuICAgIC8vIGltcG9ydCBmcm9tIFwibW9kXCI7XG59KTtcblxuLy8gdmltOiBzZXQgc3c9NCB0cz00IGV0IHR3PTgwIDpcbiJdfQ==
