const mongoose = require('mongoose');  // Correct the typo in 'moongose'

async function connectmongodb(url) {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = {
    connectmongodb
};
