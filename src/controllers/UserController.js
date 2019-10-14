const User = require('../models/User');

module.exports = {

    async index(req, res){

    try{

        const { user_id } = req.params;

        const user = await User.findById(user_id);

        return res.json({ user });
      } catch (err) {
        return res.status(400).json({ error: "Can't get user information" });
      }
    },

    async store(req, res){

        try {

            const { name, email, password } = req.body;
        
            if (await User.findOne({ email })) {
                return res.status(400).json({ error: "User already exists" });
            }

            const user = await User.create({name, email, password});

            return res.status(200).json(user);

        } catch (err) {
            return res.status(400).json({ error: "User registration failed" });
        }
    }
}