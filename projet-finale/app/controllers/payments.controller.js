const db = require('../models');
const Paiement = db.paiement;
const Reservation = db.reservation;

// fonction bich tjib les paiements ta3 user li connecté
exports.getPayments = async (req, res) => {
  try {
    console.log('User ID:', req.userId); // y'affichi ID mta3 user

    // njibou les reservations ta3 user m3a les paiements li mli9in bihom
    const reservations = await Reservation.findAll({
      where: { id_utilisateur: req.userId }, // condition: user li 7adhir
      include: [{
        model: Paiement,
        as: 'paiement' // bech yetsala bi table paiement (assocaition esmha haka)
      }],
      order: [[{model: Paiement, as: 'paiement'}, 'date_paiement', 'DESC']] // nanzlouh 3la tari5 desc
    });

    // tawa filtrina les réservations li fihom paiements w formatinahom
    const payments = reservations
      .filter(res => res.paiement) // khalli ken li fihom paiement
      .map(res => ({
        montant: res.paiement.montant, // ch7al khallas
        methode: res.paiement.methode_paiement, // cash? carte? etc
        statut: res.paiement.statut, // payé? annulé? en attente?
        date_paiement: res.paiement.date_paiement, // date mta3 paiement
        nb_places: res.nb_places // 9adeh men place 7ajiz
      }));

    console.log('Paiements trouvés:', payments); // y'affichi liste ta3 paiements

    // n'aarmli render ll page payments m3a les données w token
    res.render('payments', { 
      payments,
      token: req.query.token
    });

  } catch (error) {
    console.error('Erreur détaillée:', error); // erreur fl console
    res.status(500).send('Erreur serveur: ' + error.message); // erreur fl serveur
  }
};
