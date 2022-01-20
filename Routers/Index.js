const express = require("express");
const router = express.Router()

const AdminRouter = require('./Admin');
const ChauffeurRouter = require('./Chauffeur');
const ManagerRouter = require('./Manager');
const ResponsableRouter = require('./Responsable');
const VehiculeRouter = require('./Vehicule');
const CommandeRouter = require('./Commande');
const AuthAdminRouter = require('./Auth');
const AuthChaffeurRouter = require('./AuthChauffeur');
const AuthManagerRouter = require('./AuthManager');
const AuthResponsableRouter = require('./AuthResponsable');



router.use("/Admin", AdminRouter);
router.use("/Chauffeur", ChauffeurRouter);
router.use("/Manager", ManagerRouter);
router.use("/Responsable", ResponsableRouter);
router.use("/Vehicule", VehiculeRouter);
router.use("/Commande", CommandeRouter);
router.use("/AuthAdmin", AuthAdminRouter);
router.use("/AuthChaffeur", AuthChaffeurRouter);
router.use("/AuthManager", AuthManagerRouter);
router.use("/AuthResponsable", AuthResponsableRouter);
module.exports = router


