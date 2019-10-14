const User = require('../models/User');

module.exports = {

    async index(req, res){

        try {

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ error: "User not found" });
            }

            if (!(await user.compareHash(password))) {
                return res.status(401).json({ error: "Invalid password" });
            }

            const token = await user.generateToken();
            const id    = user.id;

            return res.json({token, id});
        } catch(error){
            return res.status(401).json({error: "User authentication failed"});
        }
    },

}