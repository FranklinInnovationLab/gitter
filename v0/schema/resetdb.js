var schema = require('./schema.js');

function clean(){
    schema.Lib.remove(function (err) {
        if (err) {
            console.log(err);
        }
    });
    schema.Review.remove(function (err) {
        if (err) {
            console.log(err);
        }
    });
    schema.User.remove(function (err) {
        if (err) {
            console.log(err);
        }
    });
}

clean();
