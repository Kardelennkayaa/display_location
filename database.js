const fs = require('fs');
var promise = require('bluebird');
var CONFIG = require('./appConfig');
var pgp = require('pg-promise')(options);
var DATABASE_PGB = pgp(CONFIG.database.postgres);

module.exports = {
       getAllLocations: getAllLocations
};

var options = {
    promiseLib: promise
};

function getAllLocations(cb) {
      DATABASE_PGB.any('SELECT recorder_name as recorder, recorder_gender as gender, public_transit as transit, ST_X(geom) as longitude, ST_Y(geom) as latitude from location_data')
      .then(function (data) {
         cb(null, data);})
       .catch(function (err) {
          cb(err)});
}
