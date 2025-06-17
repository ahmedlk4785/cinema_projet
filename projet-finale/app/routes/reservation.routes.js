// routes tejbed les réservations ili teb3in utilisateur connecté
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const authJwt = require('../middleware/authJwt');
router.get('/', [authJwt.verifyToken], reservationController.getReservations);
module.exports = router;