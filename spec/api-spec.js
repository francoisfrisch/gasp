var gasp = require("../index.js");
var Q = require("q");

describe("gasp", function(){

    describe("module", function() {
        it("should be the gasp factory function", function () {
            expect(typeof gasp).toBe("function");
        });
    });

    describe("gasp function", function() {
        it("should return a promise", function () {
            expect(Q.isPromise(gasp())).toBeTruthy();
        });
    });

});
