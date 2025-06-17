const express = require("express");
const cors = require("cors");
const path = require("path");
const methodOverride = require('method-override');

const app = express();

// 3ala5ater na3mlou CORS mta3 frontend
app.use(cors({ origin: "http://localhost:8081" }));

// Na7i l'khata2 mta3 JSON w URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3ala5ater na3mlou PUT/DELETE fi form
app.use(methodOverride('_method'));

// 3ala5ater na3mlou serve l static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "app")));

// 3ala5ater na3mlou serve les images mta3 films
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuration mta3 EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

// Na7i les models mta3 Sequelize
const db = require("./app/models");

// Na7i les routes
const moderatorRoutes = require("./app/routes/moderator.routes");
const filmRoutes = require("./app/routes/film.routes");
const reservationRoutes = require('./app/routes/reservation.routes');
const paymentRoutes = require('./app/routes/payments.routes');

// 3ala5ater na3mlou use l routes
app.use("/moderator", moderatorRoutes);
app.use("/", filmRoutes); // routes mta3 films
app.use('/reservations', reservationRoutes);
app.use('/payments', paymentRoutes);

// Routes API JSON
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/page.routes")(app);

// 3ala5ater na3mlou sync DB w na3mlou roles par défaut
db.sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced");

    return db.role.count();
  })
  .then(count => {
    if (count === 0) {
      return db.role.bulkCreate([
        { id: 1, name: "user" },
        { id: 2, name: "admin" },
        { id: 3, name: "moderator" }
      ]);
    }
  })
  .then(() => {
    console.log("Default roles inserted.");
  })
  .catch(err => {
    console.error("Error during DB setup:", err);
  });

// 3ala5ater na3mlou démarrage serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});