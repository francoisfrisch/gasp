var Q = require("q");

module.exports = gasp;

function gasp (task, interval) {
    if (!task) {
        throw new Error("No task specified.");
    }
    var deferred, timeout, args;

    if (typeof interval === "undefined") {
        interval = 50;
    }

    // This function accepts the arguments that will be passed to the task function
    return function () {
        args = Array.prototype.slice.call(arguments,0);
        if(!timeout) {
            // reset the deferred and the timeout
            deferred = Q.defer();
            timeout = setTimeout(function () {
                clearTimeout(timeout);

                Q.fcall(function () {
                    return task.apply(this, args);
                })
                .then(function () {
                    deferred.resolve(true);
                }).fail(function (reason) {
                    deferred.reject(reason);
                });
            }, interval);
        }

        return deferred.promise;
    };
}
