var express = require('express');
var router = express.Router();


/**
 * @api {get} /v1/sample Sample get
 * @apiVersion 1.0.0
 * @apiName index
 * @apiGroup Sample
 * @apiPermission admin
 *
 * @apiDescription Gets a sample json
 *
 *
 */
router.get('/v1/sample', function(req, res) {
    return res.status(200).json({
        "some": "thing",
        "success": true
    })
})

module.exports = router;
