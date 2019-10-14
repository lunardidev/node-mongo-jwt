const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function hashPassword(next) {

    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password,8);
});

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },

  generateToken() {
    return jwt.sign({ id: this.id }, process.env.SECRET_SESSION_TOKEN, {
      expiresIn: 60//86400=1dia
    });
  }
};


module.exports = mongoose.model('User', UserSchema);