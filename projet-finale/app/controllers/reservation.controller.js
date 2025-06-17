const db = require('../models');
const Reservation = db.reservation; // Na3mlou import mta3 modèle Réservation

// Fonction bech njib réservations mta3 utilisateur
exports.getReservations = async (req, res) => {
  try {
    // Na3mlou log bch nchoufou id mta3 l'utilisateur connecté
    console.log('ID Utilisateur:', req.userId); // Debug bch net2akdou enou l'ID s7i7
    
    // Nlawej 3al réservations mta3 l'utilisateur fel base
    const reservations = await Reservation.findAll({
      where: { id_utilisateur: req.userId }, // Filtrage b id_utilisateur
      order: [['date_reservation', 'DESC']] // Tri (akber date lawel)
    });
    
    // Na3mlou log l réservations ltrouvés
    console.log('Réservations ltrouvés:', reservations); // Net2akdou enou données jeyin s7i7
    
    // N3ayetou l template "reservations" w nzidou les données
    res.render('reservations', { 
      reservations, // Liste mta3 réservations
      token: req.query.token // Token bech n7adrouh fel front
    });
    
  } catch (error) {
    // Ken fama erreur
    console.error('Erreur détaillée:', error); // Na3mlou log l'erreur kima hia
    res.status(500).send('Erreur serveur: ' + error.message); // Nbadlou erreur 500 m3a message
  }
};