/**
 * Created by arpadbudai on 2015.06.11..
 */
function validateForm()
{
    var returnValue = true;

    //reset error messages
    document.getElementById('idError').innerHTML='';
    document.getElementById('createdAtError').innerHTML='';
    document.getElementById('customerNameError').innerHTML='';
    document.getElementById('addressError').innerHTML='';
    document.getElementById('itemsError').innerHTML='';

    checkName(document.forms["addItemForm"]["customerName"].value , function (customerNameError) {

        if (!!customerNameError) {
            //put error message above the input field
            document.getElementById('customerNameError').innerHTML=customerNameError;
            returnValue = false;
        }
        checkId(document.forms["addItemForm"]["id"].value, function (idError) {
            if (!!idError) {
                //put error message above the input field
                document.getElementById('idError').innerHTML=idError;
                returnValue = false;
            }
            checkcreatedAt(document.forms["addItemForm"]["createdAt"].value, function (createdAtError) {
                if (!!createdAtError) {
                    //put error message above the input field
                    document.getElementById('createdAtError').innerHTML=createdAtError;
                    returnValue = false;
                }
            })
            checkAddress(document.forms["addItemForm"]["address"].value, function (addressError) {
                if (!!addressError) {
                    //put error message above the input field
                    document.getElementById('addressError').innerHTML=addressError;
                    returnValue = false;
                }
            })
            checkItems(document.forms["addItemForm"]["items"].value, function (itemsError) {
                if (!!itemsError) {
                    //put error message above the input field
                    document.getElementById('itemsError').innerHTML=itemsError;
                    returnValue = false;
                }
            })
        })
    });
    return returnValue;
}

function checkName(name, callback) {
    var regex = /^[a-zA-Z ]{3,60}$/;
    var nameError = '';
    if(!!name) {

        if (regex.test(name)){
            return callback()
        }
        nameError = 'Not a valid name, must be alphabets between 3-60 characters long';
        return callback(nameError)
    }
    nameError = 'Please fill in the name field';
    return callback(nameError)
}

function checkId(id, callback) {
    var idRegex = /^\d+$/;
    var idError = '';

    if (!!id) {
        if (idRegex.test(id)) {
            return callback()
        }
        idError = 'Please type in a valid id';
        return callback(idError)
    }
    idError = 'Please fill in the id field';
    return callback(idError);

}

function checkcreatedAt(createAt, callback) {
    var createdAtError = '';
    var isValid = false;
    var regex = /^\d+$/;

    if(!!createdAt) {
        if (regex.test(createAt)) {
            if (createAt.length === 8 ){
                isValid = true;
            }
        }
        if (isValid) {
            return callback();
        } else {
            createdAtError = 'Not a valid input, please use only numbers ';
            return callback(createdAtError);
        }
    }
    createdAtError = 'Please fill in the created date';
    return callback(createdAtError);
}

function checkAddress(address, callback) {
    var addressError = '';

    if (!!address) {
        return callback();
    }

    addressError = 'Please fill in the address';
    return callback(addressError);

}

function checkItems(items, callback) {
    var itemsError = '';
    var regex = /^[a-zA-Z0-9 /]*$/;

    if(!!items) {
        if(regex.test(items)){
            return callback()
        } else {
            itemsError = 'Invalid input, use only alphanumeric characters with spaces and /';
            return callback(itemsError);
        }
    }
    itemsError = 'Please fill in the items section';
    return callback(itemsError);

}
