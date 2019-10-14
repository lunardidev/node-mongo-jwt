require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

class App{

    constructor(){
        this.express = express();
        this.databaseConnect();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.express.use(cors());
        this.express.use(express.json());
    }

    databaseConnect(){

        const database = `mongodb://...`;
        
        mongoose.connect(database,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

    }

    routes(){
        this.express.use(require('./routes'));
    }
}

module.exports = new App().express;