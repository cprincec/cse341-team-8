const routes = require('express').Router();
const professional = require('../controller/professional');
routes.get('/addCollection', professional.createCollection);
routes.get('/addStudent', professional.addStudent);
routes.get('/professional', professional.getProfessional);
routes.get('/addprofessional', professional.addProfessional);

module.exports = routes;