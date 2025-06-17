module.exports = (sequelize, Sequelize) => {
  const Reservation = sequelize.define("reservation", {
    id_utilisateur: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    id_seance: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'seances',
        key: 'id'
      }
    },
    nb_places: { 
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    statut: {
      type: Sequelize.ENUM('en_attente', 'confirmée', 'annulee'),
      defaultValue: 'en_attente'
    },
    date_reservation: {
      type: "TIMESTAMP", 
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  });

  return Reservation;
};