const express = require("express");
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const moderatorController = require("../controllers/moderator.controller");

// Routes mta3 dashboard
router.get("/dashboard", (req, res) => {
  res.render("moderator-dashboard", { username: "Modérateur" });
});

// Routes mta3 gestion des salles
router.get("/salles", moderatorController.listSalles);
router.post("/salles", moderatorController.createSalle);
router.put("/salles/:id", moderatorController.updateSalle);
router.delete("/salles/:id", moderatorController.deleteSalle);

// Routes mta3 les réservations
router.get("/reservations", moderatorController.listReservations);
router.post("/reservations", moderatorController.createReservation);
router.put("/reservations/:id", moderatorController.updateReservation);
router.delete("/reservations/:id", moderatorController.deleteReservation);

// Routes mta3 films
router.get("/films", moderatorController.listFilms);
router.post("/films", upload.single('image_affiche'), moderatorController.createFilm);
router.put("/films/:id", upload.single('image_affiche'), moderatorController.updateFilm);
router.delete("/films/:id", moderatorController.deleteFilm);

// Routes mta3 paiements
router.get("/payments", moderatorController.listPayments);
router.post("/payments", moderatorController.createPayment);
router.delete("/payments/:id", moderatorController.deletePayment);
router.put("/payments/:id", moderatorController.updatePayment);

// Routes mta3 gestion des séances
router.get("/seances", moderatorController.listSeances);
router.post("/seances", moderatorController.createSeance);
router.put("/seances/:id", moderatorController.updateSeance);
router.delete("/seances/:id", moderatorController.deleteSeance);
module.exports = router;
