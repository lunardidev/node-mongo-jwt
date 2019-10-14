const User = require('../../src/models/User');

module.exports = () =>{

    return Promise.all(
        [User.deleteMany({})]
    );

};