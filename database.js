const fs = require('fs');
var promise = require('bluebird');
var CONFIG = require('./appConfig');
var pgp = require('pg-promise')(options);
var DATABASE_PGB = pgp(CONFIG.database.postgres);

module.exports = {
       getAllLocations: getAllLocations,
};

var options = {
    promiseLib: promise
};


function getAllLocations(cb) {
      DATABASE_PGB.any('SELECT name, surname, start, finish, duration, ST_X(geometry) as longitude, ST_Y(geometry) as latitude, type FROM period WHERE time < now() - INTERVAL '1 minute'')
      .then(function (data) {
         cb(null, data);})
       .catch(function (err) {
          cb(err)});
}



