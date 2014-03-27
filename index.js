var Q = require("q");

module.exports = gasp;

function gasp() {
    var deferred = Q.defer();
    return deferred.promise;
}
