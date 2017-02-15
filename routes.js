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

    // Insert routes below
    app.use('/', require('./api/index'));

    // send view page on empty route
    // app.route('/')
    //     .get(function(req, res) {
    //         res.render('index', {
    //             title: 'Express'
    //         });
    //     });

    // All undefined asset or api routes should return a 404
    app.route('/*')
        .get(function(req, res) {
            return res.sendStatus(404);
        });
};
