var express = require('express');
var router = express.Router();
var path = require('path');
var appRoot = require('app-root-path');
var helper = require(path.join(appRoot.path, "helper", "manipulateBoxDatas.js"));

/* GET users listing. */
router.get('/', function(req, res, next) {
    var selectedItem = '';

    if (!global.sortObj) {
        global.sortObj = {
            sortBy: 'address',
            orderBy: ''
        }
    }
    if (global.sortObj.orderBy === '-') {
        selectedItem += global.sortObj.orderBy + global.sortObj.sortBy;
    } else {
        selectedItem = global.sortObj.sortBy;
    }
    var resObj = {
        title: 'Send and Store',
        sortBy: selectedItem
    };
    helper.sortBoxdatas(global.sortObj, function (err, sortedList) {
        if (!!err) {
            var error = {};
            error.status = 500;
            return res.render('error', {message: err, error : {status: 500}});
        }
        //get the default / last set sorting view
        resObj.data = sortedList;
        return res.render('box', resObj);
    })
});

router.post('/', function(req, res) {
    helper.addBoxDatas(req.body, function(err) {
        var selecedItem = '';

        if (!!err) {
            var error = {};
            error.status = 500;
            return res.render('error', {message: err, error : {status: 500}});

        }

        if (!global.sortObj) {
            global.sortObj = {
                sortBy: 'address',
                orderBy: ''
            }
        }
        if (global.sortObj.orderBy === '-') {
            selecedItem += global.sortObj.orderBy + global.sortObj.sortBy;
        } else {
            selecedItem = global.sortObj.sortBy;
        }
        var resObj = {
            title: 'Send and Store',
            sortBy: selecedItem
        };
        helper.sortBoxdatas(global.sortObj, function (err, sortedList) {
            if (!!err) {
                var error = {};
                error.status = 500;
                res.render('error', {message: err, error : {status: 500}});
            }
            //get the default / last set sorting view
            resObj.data = sortedList;
            res.redirect('/');
        })
    })
});

router.delete('/', function(req, res) {
    var id = parseInt(req.body.id);
    if (!isNaN(id)){
        helper.deleteBoxDatas([id], function(err){
            //requires JSON reply
            if(!!err) {
                res.json({
                    Success:false,
                    Error: err
                });
            }
            res.json({Success:true});
            return res.end();
        })
    } else {
        res.json({
            Success:false,
            Error: 'NaN'
        });
    }

});

module.exports = router;
