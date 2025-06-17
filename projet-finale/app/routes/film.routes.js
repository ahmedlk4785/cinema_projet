const express = require("express");
const router = express.Router(); // Naamlou router men express bach n'ajoutiw les routes
const db = require("../models"); // Nimportiw les modèles mel dossier models
const { Op } = require("sequelize"); // Nimportiw Sequelize.Op bach nestaamlou fi les conditions

// Route li t'affichi kol les films
router.get("/queues", async (req, res) => {
  try {
    // Njibou kol les films mel base de données
    const films = await db.film.findAll();

    // Nformiw kol film b image base64 bach najmou n'affichiwha fi front
    const filmsWithBase64Image = films.map(film => {
      let base64Image = null;
      if (film.image_affiche) {
        base64Image = film.image_affiche.toString('base64'); // Nconverty image l base64
      }
      return {
        ...film.dataValues, // Nekhdhou les données mta3 film
        image_base64: base64Image // N'ajoutiw l'image base64
      };
    });

    // N'affichiw page "queues" w nb3thoulha les films
    res.render("queues", { films: filmsWithBase64Image });
  } catch (err) {
    console.error("Erreur affichage films:", err); // Error log fi console
    res.status(500).send({ message: err.message }); // Response erreur serveur
  }
});

// Route li t'affichi les séances d’un film
router.get("/user-seance/:filmId", async (req, res) => {
  try {
    const filmId = req.params.filmId; // Njiib l'ID du film men URL
    const film = await db.film.findByPk(filmId); // Njib film b ID

    if (!film) {
      return res.status(404).send('Film non trouvé'); // Si ma l9inach film, error 404
    }

    // Npreparew l’objet film b image base64
    const filmWithBase64 = {
      ...film.dataValues,
      image_base64: film.image_affiche ? film.image_affiche.toString('base64') : null
    };

    // Njibou les séances li matzidch 3al date actuelle
    const seances = await db.seance.findAll({
      where: {
        id_film: filmId,
        date_heure: {
          [Op.gte]: new Date() // date mouch qadim
        }
      },
      include: [{
        model: db.salle, // Ninclude salle mta3 séance
        as: 'salle',
        required: true
      }],
      order: [['date_heure', 'ASC']] // Nsortiw selon l'heure
    });

    // N'affichiw page user-seance w nb3thou film + séances
    res.render('user-seance', { 
      film: filmWithBase64,
      seances: seances
    });

  } catch (error) {
    console.error("Erreur lors de la récupération des séances:", error);
    res.status(500).send('Erreur serveur'); // Erreur serveur général
  }
});

// Route POST li tkhalli utilisateur yaaml réservation
router.post("/reservation/:seanceId", async (req, res) => {
  try {
    const userId = req.user?.id || 1; // test default 1 7awelet nejbed id_utilisateur à partir ml token ama najemtech seul champs ili 7abech ye5dem donc on a supposé que seul le responsable gére les reservations et les paiements
    const seanceId = req.params.seanceId; // Njibou ID séance men URL
    const nombrePlaces = parseInt(req.body.nombre_places, 10) || 1; // Nombre de places demandé

    const seance = await db.seance.findByPk(seanceId); // Njib séance b ID
    if (!seance) {
      return res.status(404).send('Séance non trouvée'); // Si ma l9inach séance
    }

    // Vérification si fama assez de places
    if (seance.places_disponibles < nombrePlaces || nombrePlaces <= 0) {
      return res.status(400).send('Nombre de places invalide ou insuffisant');
    }

    // N'ajoutiw réservation
    await db.reservation.create({
      id_utilisateur: userId,
      id_seance: seanceId,
      nb_places: nombrePlaces,
      statut: 'en_attente', // statut initial
      date_reservation: new Date()
    });

    // Nnaqsou nombre de places disponibles
    seance.places_disponibles -= nombrePlaces;
    await seance.save(); // Nsajlou l'update

    res.redirect("/confirmation-reservation"); // Redirection l page confirmation
  } catch (error) {
    console.error("Erreur lors de la réservation:", error);
    res.status(500).send('Erreur serveur'); // Erreur serveur général
  }
});

// Route bach n'affichiw page de confirmation
router.get("/confirmation-reservation", (req, res) => {
  res.render("confirmation-reservation");
});
// Export du router bach nestaamlouh fi app principal
module.exports = router;
