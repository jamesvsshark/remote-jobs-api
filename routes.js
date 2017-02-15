/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {

    // Enable CORS
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
        next();
    });

    // Insert API routes
    app.use('/api/jobs', require('./api/jobs'));

    // app view routes - TODO: make this cleaner in own file
    app.route('/')
        .get(function(req, res) {
            var JobController = require('./controllers/jobs.controller');

            JobController.index(function(jobs) {
                res.render('jobs', {
                    title: 'Remote jobs around the Country: Powered by Dice',
                    jobs: jobs
                });
            })
        });

    app.route('/jobs-by-state')
        .get(function(req, res) {
            var JobController = require('./controllers/jobs.controller');

            JobController.getByState(function(results) {
                res.render('jobs-by-state', {
                    title: 'Remote jobs around the Country by State: Powered by Dice',
                    jobs: results
                });
            })
        });

    // All undefined asset or api routes should return a 404
    app.route('/*')
        .get(function(req, res) {
            return res.sendStatus(404);
        });
};
