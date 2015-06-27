/**
 * Created by Arpad Budai on 2015. 06. 27..
 */

var express = require('express');
var router = express.Router();
var path = require('path');
var appRoot = require('app-root-path');
var helper = require(path.join(appRoot.path, "helper", "manipulateBoxDatas.js"));

router.get('/', function(req, res, next) {
    var sortingSettings = req.query.sortList.split('-');
    var selecedItem = '';
    var resObj = {
        title: 'Send and Store'
    };

    if (sortingSettings.length > 1){
        global.sortObj = {
            orderBy: '-',
            sortBy: sortingSettings[1]
        }
        selecedItem += '-' + sortingSettings[1];
    } else {
        global.sortObj = {
            orderBy: '',
            sortBy: sortingSettings[0]
        }
        selecedItem += selecedItem + sortingSettings[0]
    }
    resObj.sortBy = selecedItem;
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

module.exports = router;