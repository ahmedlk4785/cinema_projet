const jwt = require("jsonwebtoken"); // Importation module jwt bech na3mlou gestion mta3 tokens
const config = require("../config/auth.config.js"); // Importation configuration mta3 l'authentification
const db = require("../models");
const User = db.user; // Model mta3 User

// Affichage page d'accueil
exports.showHome = (req, res) => {
  res.render("acceuil"); // Yeb3ath page accueil
};

// Affichage page d'inscription
exports.showInscription = (req, res) => {
  res.render("inscription"); // Yeb3ath page inscription
};

// Affichage page login
exports.showLogin = (req, res) => {
  res.render("login"); // Yeb3ath page login
};

// Affichage dashboard admin
exports.showAdminDashboard = (req, res) => {
  res.render("admin-dashboard"); // Yeb3ath dashboard admin
};

// Affichage profil utilisateur
exports.showProfile = (req, res) => {
  const token = req.query.token; // Ye5ou token mel URL

  // Ken mafamech token
  if (!token) {
    return res.status(403).send({ message: "Aucun token fourni." }); // Erreur 403
  }

  // Verification token
  jwt.verify(token, config.secret, (err, decoded) => {
    // Ken token mouch valide
    if (err) {
      return res.status(401).send({ message: "Token invalide." }); // Erreur 401
    }

    // Recherche utilisateur fel base b ID mel token
    User.findByPk(decoded.id)
      .then(user => {
        // Ken utilisateur mouch mawjoud
        if (!user) {
          return res.status(404).send({ message: "Utilisateur non trouvé." }); // Erreur 404
        }

        // Affichage page profil avec données utilisateur
        res.render("profil", {
          username: user.username, // Esem utilisateur
          email: user.email, // Email
        });
      })
      .catch(err => {
        console.error(err); // Log l'erreur
        res.status(500).send({ message: "Erreur serveur." }); // Erreur 500 ken fama problème
      });
  });
};