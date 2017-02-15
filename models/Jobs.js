'use strict';
var request = require('request');

exports.getAllJobsFromDice = (cb) => {
    var pageCount = 1;
    var results = [];

    var getResults = () => {
        request("http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=remote&page=" + pageCount, function(err, resp, body) {
            handleResults(err, resp, body)
        });
    }

    var handleResults = (err, resp, body) => {
        if (err) {
            return cb(err);
        }

        var _body = JSON.parse(body);

        if (_body.resultItemList)
            _body.resultItemList.forEach(function(job) {
                job.source = "DICE";
                job.industry = "Tech";
                job.state = function() {
                    try {
                        var _location = job.location.split(',');
                        var state = _location[_location.length - 1].trim();
                        if (state === '') throw error;
                        return state;
                    } catch (ex) {
                        return 'Unknown';
                    }
                }()
                results.push(job);
            });

        if (_body.lastDocument < _body.count) {
            pageCount++;
            getResults();
        } else {
            return cb(null, results);
        }
    }

    getResults();
}
