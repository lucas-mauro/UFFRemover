'use strict';

var _chai = require('chai');

var _ = require('..');

var _esprima = require('esprima');

describe('implicit global reference', function () {
    it('assignments global scope', function () {
        var ast = (0, _esprima.parse)('\n            var x = 20;\n            x = 300;\n        ');

        var _analyze = (0, _.analyze)(ast);

        var scopes = _analyze.scopes;


        (0, _chai.expect)(scopes.map(function (scope) {
            return scope.variables.map(function (variable) {
                return variable.defs.map(function (def) {
                    return def.type;
                });
            });
        })).to.be.eql([[['Variable']]]);

        (0, _chai.expect)(scopes[0].implicit.variables.map(function (variable) {
            return variable.name;
        })).to.be.eql([]);
    });

    it('assignments global scope without definition', function () {
        var ast = (0, _esprima.parse)('\n            x = 300;\n            x = 300;\n        ');

        var _analyze2 = (0, _.analyze)(ast);

        var scopes = _analyze2.scopes;


        (0, _chai.expect)(scopes.map(function (scope) {
            return scope.variables.map(function (variable) {
                return variable.defs.map(function (def) {
                    return def.type;
                });
            });
        })).to.be.eql([[]]);

        (0, _chai.expect)(scopes[0].implicit.variables.map(function (variable) {
            return variable.name;
        })).to.be.eql(['x']);
    });

    it('assignments global scope without definition eval', function () {
        var ast = (0, _esprima.parse)('\n            function inner() {\n                eval(str);\n                x = 300;\n            }\n        ');

        var _analyze3 = (0, _.analyze)(ast);

        var scopes = _analyze3.scopes;


        (0, _chai.expect)(scopes.map(function (scope) {
            return scope.variables.map(function (variable) {
                return variable.defs.map(function (def) {
                    return def.type;
                });
            });
        })).to.be.eql([[['FunctionName']], [[]]]);

        (0, _chai.expect)(scopes[0].implicit.variables.map(function (variable) {
            return variable.name;
        })).to.be.eql([]);
    });

    it('assignment leaks', function () {
        var ast = (0, _esprima.parse)('\n            function outer() {\n                x = 20;\n            }\n        ');

        var _analyze4 = (0, _.analyze)(ast);

        var scopes = _analyze4.scopes;


        (0, _chai.expect)(scopes.map(function (scope) {
            return scope.variables.map(function (variable) {
                return variable.name;
            });
        })).to.be.eql([['outer'], ['arguments']]);

        (0, _chai.expect)(scopes[0].implicit.variables.map(function (variable) {
            return variable.name;
        })).to.be.eql(['x']);
    });

    it('assignment doesn\'t leak', function () {
        var ast = (0, _esprima.parse)('\n            function outer() {\n                function inner() {\n                    x = 20;\n                }\n                var x;\n            }\n        ');

        var _analyze5 = (0, _.analyze)(ast);

        var scopes = _analyze5.scopes;


        (0, _chai.expect)(scopes.map(function (scope) {
            return scope.variables.map(function (variable) {
                return variable.name;
            });
        })).to.be.eql([['outer'], ['arguments', 'inner', 'x'], ['arguments']]);

        (0, _chai.expect)(scopes[0].implicit.variables.map(function (variable) {
            return variable.name;
        })).to.be.eql([]);
    });

    it('for-in-statement leaks', function () {
        var ast = (0, _esprima.parse)('\n            function outer() {\n                for (x in y) { }\n            }');

        var _analyze6 = (0, _.analyze)(ast);

        var scopes = _analyze6.scopes;


        (0, _chai.expect)(scopes.map(function (scope) {
            return scope.variables.map(function (variable) {
                return variable.name;
            });
        })).to.be.eql([['outer'], ['arguments']]);

        (0, _chai.expect)(scopes[0].implicit.variables.map(function (variable) {
            return variable.name;
        })).to.be.eql(['x']);
    });

    it('for-in-statement doesn\'t leaks', function () {
        var ast = (0, _esprima.parse)('\n            function outer() {\n                function inner() {\n                    for (x in y) { }\n                }\n                var x;\n            }\n        ');

        var _analyze7 = (0, _.analyze)(ast);

        var scopes = _analyze7.scopes;


        (0, _chai.expect)(scopes.map(function (scope) {
            return scope.variables.map(function (variable) {
                return variable.name;
            });
        })).to.be.eql([['outer'], ['arguments', 'inner', 'x'], ['arguments']]);

        (0, _chai.expect)(scopes[0].implicit.variables.map(function (variable) {
            return variable.name;
        })).to.be.eql([]);
    });
}); // Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltcGxpY2l0LWdsb2JhbC1yZWZlcmVuY2UuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJpdCIsImFzdCIsInNjb3BlcyIsIm1hcCIsInNjb3BlIiwidmFyaWFibGVzIiwidmFyaWFibGUiLCJkZWZzIiwiZGVmIiwidHlwZSIsInRvIiwiYmUiLCJlcWwiLCJpbXBsaWNpdCIsIm5hbWUiXSwibWFwcGluZ3MiOiI7O0FBdUJBOztBQUNBOztBQUNBOztBQUVBQSxTQUFTLDJCQUFULEVBQXNDLFlBQVc7QUFDN0NDLE9BQUcsMEJBQUgsRUFBK0IsWUFBVztBQUN0QyxZQUFNQyxNQUFNLGdGQUFaOztBQURzQyx1QkFNbkIsZUFBUUEsR0FBUixDQU5tQjs7QUFBQSxZQU05QkMsTUFOOEIsWUFNOUJBLE1BTjhCOzs7QUFRdEMsMEJBQU9BLE9BQU9DLEdBQVAsQ0FBVztBQUFBLG1CQUFTQyxNQUFNQyxTQUFOLENBQWdCRixHQUFoQixDQUFvQjtBQUFBLHVCQUFZRyxTQUFTQyxJQUFULENBQWNKLEdBQWQsQ0FBa0I7QUFBQSwyQkFBT0ssSUFBSUMsSUFBWDtBQUFBLGlCQUFsQixDQUFaO0FBQUEsYUFBcEIsQ0FBVDtBQUFBLFNBQVgsQ0FBUCxFQUFpR0MsRUFBakcsQ0FBb0dDLEVBQXBHLENBQXVHQyxHQUF2RyxDQUNJLENBQ0ksQ0FDSSxDQUNJLFVBREosQ0FESixDQURKLENBREo7O0FBVUEsMEJBQU9WLE9BQU8sQ0FBUCxFQUFVVyxRQUFWLENBQW1CUixTQUFuQixDQUE2QkYsR0FBN0IsQ0FBaUM7QUFBQSxtQkFBWUcsU0FBU1EsSUFBckI7QUFBQSxTQUFqQyxDQUFQLEVBQW9FSixFQUFwRSxDQUF1RUMsRUFBdkUsQ0FBMEVDLEdBQTFFLENBQThFLEVBQTlFO0FBQ0gsS0FuQkQ7O0FBcUJBWixPQUFHLDZDQUFILEVBQWtELFlBQVc7QUFDekQsWUFBTUMsTUFBTSw2RUFBWjs7QUFEeUQsd0JBTXRDLGVBQVFBLEdBQVIsQ0FOc0M7O0FBQUEsWUFNakRDLE1BTmlELGFB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VztBQUFBLG1CQUFTQyxNQUFNQyxTQUFOLENBQWdCRixHQUFoQixDQUFvQjtBQUFBLHVCQUFZRyxTQUFTUSxJQUFyQjtBQUFBLGFBQXBCLENBQVQ7QUFBQSxTQUFYLENBQVAsRUFBNEVKLEVBQTVFLENBQStFQyxFQUEvRSxDQUFrRkMsR0FBbEYsQ0FDSSxDQUNJLENBQ0ksT0FESixDQURKLEVBSUksQ0FDSSxXQURKLEVBRUksT0FGSixFQUdJLEdBSEosQ0FKSixFQVNJLENBQ0ksV0FESixDQVRKLENBREo7O0FBZ0JBLDBCQUFPVixPQUFPLENBQVAsRUFBVVcsUUFBVixDQUFtQlIsU0FBbkIsQ0FBNkJGLEdBQTdCLENBQWlDO0FBQUEsbUJBQVlHLFNBQVNRLElBQXJCO0FBQUEsU0FBakMsQ0FBUCxFQUFvRUosRUFBcEUsQ0FBdUVDLEVBQXZFLENBQTBFQyxHQUExRSxDQUE4RSxFQUE5RTtBQUNILEtBN0JEO0FBOEJILENBMUxELEUsQ0EzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImltcGxpY2l0LWdsb2JhbC1yZWZlcmVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKEMpIDIwMTMgWXVzdWtlIFN1enVraSA8dXRhdGFuZS50ZWFAZ21haWwuY29tPlxuLy9cbi8vIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuLy8gbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4vL1xuLy8gICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4vLyAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuLy8gICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0XG4vLyAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuLy8gICAgIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4vL1xuLy8gVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbi8vIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbi8vIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4vLyBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgPENPUFlSSUdIVCBIT0xERVI+IEJFIExJQUJMRSBGT1IgQU5ZXG4vLyBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuLy8gKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuLy8gTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EXG4vLyBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuLy8gKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GXG4vLyBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuXG5cbmltcG9ydCB7IGV4cGVjdCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgYW5hbHl6ZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnZXNwcmltYSc7XG5cbmRlc2NyaWJlKCdpbXBsaWNpdCBnbG9iYWwgcmVmZXJlbmNlJywgZnVuY3Rpb24oKSB7XG4gICAgaXQoJ2Fzc2lnbm1lbnRzIGdsb2JhbCBzY29wZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBhc3QgPSBwYXJzZShgXG4gICAgICAgICAgICB2YXIgeCA9IDIwO1xuICAgICAgICAgICAgeCA9IDMwMDtcbiAgICAgICAgYCk7XG5cbiAgICAgICAgY29uc3QgeyBzY29wZXMgfSA9IGFuYWx5emUoYXN0KTtcblxuICAgICAgICBleHBlY3Qoc2NvcGVzLm1hcChzY29wZSA9PiBzY29wZS52YXJpYWJsZXMubWFwKHZhcmlhYmxlID0+IHZhcmlhYmxlLmRlZnMubWFwKGRlZiA9PiBkZWYudHlwZSkpKSkudG8uYmUuZXFsKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1ZhcmlhYmxlJ1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXVxuICAgICAgICApO1xuXG4gICAgICAgIGV4cGVjdChzY29wZXNbMF0uaW1wbGljaXQudmFyaWFibGVzLm1hcCh2YXJpYWJsZSA9PiB2YXJpYWJsZS5uYW1lKSkudG8uYmUuZXFsKFtdKTtcbiAgICB9KTtcblxuICAgIGl0KCdhc3NpZ25tZW50cyBnbG9iYWwgc2NvcGUgd2l0aG91dCBkZWZpbml0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGFzdCA9IHBhcnNlKGBcbiAgICAgICAgICAgIHggPSAzMDA7XG4gICAgICAgICAgICB4ID0gMzAwO1xuICAgICAgICBgKTtcblxuICAgICAgICBjb25zdCB7IHNjb3BlcyB9ID0gYW5hbHl6ZShhc3QpO1xuXG4gICAgICAgIGV4cGVjdChzY29wZXMubWFwKHNjb3BlID0+IHNjb3BlLnZhcmlhYmxlcy5tYXAodmFyaWFibGUgPT4gdmFyaWFibGUuZGVmcy5tYXAoZGVmID0+IGRlZi50eXBlKSkpKS50by5iZS5lcWwoXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF1cbiAgICAgICAgKTtcblxuICAgICAgICBleHBlY3Qoc2NvcGVzWzBdLmltcGxpY2l0LnZhcmlhYmxlcy5tYXAodmFyaWFibGUgPT4gdmFyaWFibGUubmFtZSkpLnRvLmJlLmVxbChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAneCdcbiAgICAgICAgICAgIF1cbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdhc3NpZ25tZW50cyBnbG9iYWwgc2NvcGUgd2l0aG91dCBkZWZpbml0aW9uIGV2YWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgYXN0ID0gcGFyc2UoYFxuICAgICAgICAgICAgZnVuY3Rpb24gaW5uZXIoKSB7XG4gICAgICAgICAgICAgICAgZXZhbChzdHIpO1xuICAgICAgICAgICAgICAgIHggPSAzMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIGApO1xuXG4gICAgICAgIGNvbnN0IHsgc2NvcGVzIH0gPSBhbmFseXplKGFzdCk7XG5cbiAgICAgICAgZXhwZWN0KHNjb3Blcy5tYXAoc2NvcGUgPT4gc2NvcGUudmFyaWFibGVzLm1hcCh2YXJpYWJsZSA9PiB2YXJpYWJsZS5kZWZzLm1hcChkZWYgPT4gZGVmLnR5cGUpKSkpLnRvLmJlLmVxbChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdGdW5jdGlvbk5hbWUnXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXVxuICAgICAgICApO1xuXG4gICAgICAgIGV4cGVjdChzY29wZXNbMF0uaW1wbGljaXQudmFyaWFibGVzLm1hcCh2YXJpYWJsZSA9PiB2YXJpYWJsZS5uYW1lKSkudG8uYmUuZXFsKFtdKTtcbiAgICB9KTtcblxuICAgIGl0KCdhc3NpZ25tZW50IGxlYWtzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGFzdCA9IHBhcnNlKGBcbiAgICAgICAgICAgIGZ1bmN0aW9uIG91dGVyKCkge1xuICAgICAgICAgICAgICAgIHggPSAyMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYCk7XG5cbiAgICAgICAgY29uc3QgeyBzY29wZXMgfSA9IGFuYWx5emUoYXN0KTtcblxuICAgICAgICBleHBlY3Qoc2NvcGVzLm1hcChzY29wZSA9PiBzY29wZS52YXJpYWJsZXMubWFwKHZhcmlhYmxlID0+IHZhcmlhYmxlLm5hbWUpKSkudG8uYmUuZXFsKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ291dGVyJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnYXJndW1lbnRzJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF1cbiAgICAgICAgKTtcblxuICAgICAgICBleHBlY3Qoc2NvcGVzWzBdLmltcGxpY2l0LnZhcmlhYmxlcy5tYXAodmFyaWFibGUgPT4gdmFyaWFibGUubmFtZSkpLnRvLmJlLmVxbChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAneCdcbiAgICAgICAgICAgIF1cbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdhc3NpZ25tZW50IGRvZXNuXFwndCBsZWFrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGFzdCA9IHBhcnNlKGBcbiAgICAgICAgICAgIGZ1bmN0aW9uIG91dGVyKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlubmVyKCkge1xuICAgICAgICAgICAgICAgICAgICB4ID0gMjA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB4O1xuICAgICAgICAgICAgfVxuICAgICAgICBgKTtcblxuICAgICAgICBjb25zdCB7IHNjb3BlcyB9ID0gYW5hbHl6ZShhc3QpO1xuXG4gICAgICAgIGV4cGVjdChzY29wZXMubWFwKHNjb3BlID0+IHNjb3BlLnZhcmlhYmxlcy5tYXAodmFyaWFibGUgPT4gdmFyaWFibGUubmFtZSkpKS50by5iZS5lcWwoXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnb3V0ZXInXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICdhcmd1bWVudHMnLFxuICAgICAgICAgICAgICAgICAgICAnaW5uZXInLFxuICAgICAgICAgICAgICAgICAgICAneCdcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ2FyZ3VtZW50cydcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdXG4gICAgICAgICk7XG5cbiAgICAgICAgZXhwZWN0KHNjb3Blc1swXS5pbXBsaWNpdC52YXJpYWJsZXMubWFwKHZhcmlhYmxlID0+IHZhcmlhYmxlLm5hbWUpKS50by5iZS5lcWwoW10pO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnZm9yLWluLXN0YXRlbWVudCBsZWFrcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBhc3QgPSBwYXJzZShgXG4gICAgICAgICAgICBmdW5jdGlvbiBvdXRlcigpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHggaW4geSkgeyB9XG4gICAgICAgICAgICB9YCk7XG5cbiAgICAgICAgY29uc3QgeyBzY29wZXMgfSA9IGFuYWx5emUoYXN0KTtcblxuICAgICAgICBleHBlY3Qoc2NvcGVzLm1hcChzY29wZSA9PiBzY29wZS52YXJpYWJsZXMubWFwKHZhcmlhYmxlID0+IHZhcmlhYmxlLm5hbWUpKSkudG8uYmUuZXFsKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ291dGVyJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnYXJndW1lbnRzJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF1cbiAgICAgICAgKTtcblxuICAgICAgICBleHBlY3Qoc2NvcGVzWzBdLmltcGxpY2l0LnZhcmlhYmxlcy5tYXAodmFyaWFibGUgPT4gdmFyaWFibGUubmFtZSkpLnRvLmJlLmVxbChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAneCdcbiAgICAgICAgICAgIF1cbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdmb3ItaW4tc3RhdGVtZW50IGRvZXNuXFwndCBsZWFrcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBhc3QgPSBwYXJzZShgXG4gICAgICAgICAgICBmdW5jdGlvbiBvdXRlcigpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpbm5lcigpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh4IGluIHkpIHsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYCk7XG5cbiAgICAgICAgY29uc3QgeyBzY29wZXMgfSA9IGFuYWx5emUoYXN0KTtcblxuICAgICAgICBleHBlY3Qoc2NvcGVzLm1hcChzY29wZSA9PiBzY29wZS52YXJpYWJsZXMubWFwKHZhcmlhYmxlID0+IHZhcmlhYmxlLm5hbWUpKSkudG8uYmUuZXFsKFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgJ291dGVyJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnYXJndW1lbnRzJyxcbiAgICAgICAgICAgICAgICAgICAgJ2lubmVyJyxcbiAgICAgICAgICAgICAgICAgICAgJ3gnXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICdhcmd1bWVudHMnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXVxuICAgICAgICApO1xuXG4gICAgICAgIGV4cGVjdChzY29wZXNbMF0uaW1wbGljaXQudmFyaWFibGVzLm1hcCh2YXJpYWJsZSA9PiB2YXJpYWJsZS5uYW1lKSkudG8uYmUuZXFsKFtdKTtcbiAgICB9KTtcbn0pO1xuIl19