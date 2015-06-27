/**
 * Created by Arpad Budai on 2015. 06. 27..
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('addItem', {title: 'Add item'});
});

module.exports = router;