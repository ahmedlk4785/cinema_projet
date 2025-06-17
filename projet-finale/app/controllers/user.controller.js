// Contenu accessible lil koulna (publique)
exports.allAccess = (req, res) =>{ 
  res.status(200).send("Public Content."); // Yab3ath contenu publique
}; 

// Contenu réservé lil utilisateurs normaux
exports.userBoard = (req, res) =>{ 
  res.status(200).send("User Content."); // Yab3ath contenu mta3 user
}; 

// Contenu réservé lil admins
exports.adminBoard = (req, res) =>{ 
  res.status(200).send("Admin Content."); // Yab3ath contenu mta3 admin
};  

// Contenu réservé lil moderateurs
exports.moderatorBoard = (req, res) =>{ 
  res.status(200).send("Moderator Content."); // Yab3ath contenu mta3 modérateur
};