const express = require("express");
const router = express.Router()

const AdminRouter = require('./Admin');
const ChauffeurRouter = require('./Chauffeur');
const ManagerRouter = require('./Manager');
const ResponsableRouter = require('./Responsable');
const VehiculeRouter = require('./Vehicule');
const CommandeRouter = require('./Commande');
const AuthAdminRouter = require('./Auth');
const AuthChauffeurRouter = require('./AuthChauffeur');
const AuthManagerRouter = require('./AuthManager');
const AuthResponsableRouter = require('./AuthResponsable');
const PrimeRouter = require('./Prime');



router.use("/Admin", AdminRouter);
router.use("/Chauffeur", ChauffeurRouter);
router.use("/Manager", ManagerRouter);
router.use("/Responsable", ResponsableRouter);
router.use("/Vehicule", VehiculeRouter);
router.use("/Commande", CommandeRouter);
router.use("/AuthAdmin", AuthAdminRouter);
router.use("/AuthChauffeur", AuthChauffeurRouter);
router.use("/AuthManager", AuthManagerRouter);
router.use("/AuthResponsable", AuthResponsableRouter);
router.use("/Prime", PrimeRouter);
module.exports = router


