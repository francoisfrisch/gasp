var gasp = require("../index.js");
var Q = require("q");
require("./lib/jasmine-promise");

describe("gasp", function (){

    describe("module", function () {
        it("should be the gasp factory function", function () {
            expect(typeof gasp).toBe("function");
        });
    });

    describe("gasp function", function () {
        it("should return a function", function () {
            expect(typeof gasp(function () {})).toBe("function");
        });
        it("should throw when no task is specified", function () {
            expect(function () {
                gasp();
            }).toThrow();
        });
    });

    describe("gasped function", function () {
        var gasped;
        beforeEach(function () {
            gasped = gasp(function () {});
        });
        it("should return a promise", function () {
            expect(Q.isPromise(gasped())).toBeTruthy();
        });
        describe("returned promise", function () {
            var gasped, task;
            beforeEach(function () {
                task = jasmine.createSpy("task").andCallFake(function () {
                    throw new Error("BAD");
                });
                gasped = gasp(task);
            });
            it("should forward a rejection if the task throws an error", function () {
                return gasped()
                .then(function () {
                    expect(false).toBeTruthy();
                })
                .fail(function () {
                    expect(true).toBeTruthy();
                });
            });
        });
    });

    describe("task function", function () {
        var gasped, task;
        beforeEach(function () {
            task = jasmine.createSpy("task").andCallFake(function () {
                return Q(true);
            });
            gasped = gasp(task, 50);
        });
        it("should be called eventually", function () {
            return gasped()
            .then(function () {
                expect(task).toHaveBeenCalled();
            });
        });
        it("should be called with the last arguments by default", function () {
            gasped(998);
            return gasped(999)
            .then(function () {
                expect(task).toHaveBeenCalledWith(999);
            });
        });
        it("should only be called once per interval", function () {
            gasped();
            return gasped()
            .then(function () {
                expect(task.callCount).toEqual(1);
            });
        });
    });

});

//TODO deal with timeouts
//TODO scope of the task
