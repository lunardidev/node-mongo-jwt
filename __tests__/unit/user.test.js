const app = require('../../src/app');
const factory = require('../factories');
const bcrypt = require("bcryptjs");
const truncate = require('../utils/truncate');
const User = require('../../src/models/User');

describe('Users', () => {

    beforeEach(async () => {
        await truncate();
    });

    it('should encrypt user password', async () => {

        const user = await factory.create('User', {
            password: '123456'
        });

        const compareHash = await bcrypt.compare('123456', user.password);

        expect(compareHash).toBe(true);
    });

});