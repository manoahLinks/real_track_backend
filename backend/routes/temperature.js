const express = require('express'),
    router = express.Router(),
    controller = require('../controller/temperature');

router.route('/')
    .post(controller.updateTemperature);


module.exports = router;