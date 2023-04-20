const express = require('express')
const controller = require('../controller')

const routes =  express.Router();

routes.get("/",controller.getData)



module.exports=routes;