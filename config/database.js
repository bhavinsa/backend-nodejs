var mongoose = require('mongoose');
mongoose.connect(config.db);
//mongoose.connect(config.db, config.dbOptions);

mongoose.connection.on('error', function (err) {
    console.log('err -->'+ err);
    console.log("Could not connect server....");
});

