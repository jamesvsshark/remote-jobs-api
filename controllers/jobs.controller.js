'use strict';

var Jobs = require('../models/Jobs');
var groupBy = require('group-by');

exports.index = (cb) => {
    Jobs.getAllJobsFromDice(function(err, data) {
        cb(data);
    });
}

exports.getByState = (cb) => {
    Jobs.getAllJobsFromDice(function(err, data) {
        cb(groupBy(data, 'state'));
    })
}
