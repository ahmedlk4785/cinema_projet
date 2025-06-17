// Fonction li tjib kol les films w t'affichihom fil page "films"
exports.findAll = async (req, res) => {
  try {
    // Njibou kol les films mel base de données
    const films = await Film.findAll();

    // Nformatou kol film w nhawlou l'image l base64 si fama
    const filmsWithBase64 = films.map(film => {
      const filmJson = film.toJSON(); // Nconvertiw l'objet Sequelize en objet simple (JS)
      
      // Si fama image_affiche, nhawlouha l base64 bach najmou n'affichiwha fil HTML
      if (filmJson.image_affiche) {
        filmJson.image_affiche = Buffer.from(filmJson.image_affiche).toString('base64');
      }

      return filmJson; // Nrendiw l'objet film formaté
    });

    // N'affichiw la page 'films' w nb3thoulha la liste des films formatés
    res.render('films', { films: filmsWithBase64 });
  } catch (error) {
    console.error(error); // Error log fi console
    res.status(500).send('Erreur serveur'); // Retour erreur serveur si fama problème
  }
};
