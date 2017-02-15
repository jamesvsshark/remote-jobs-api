'use strict';

var Jobs = require('../../models/Jobs');

exports.index = (req, res) => {
    Jobs.getAllJobsFromDice(function(err, results) {
        return res.send(200, results);
    });
}
