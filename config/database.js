require("dotenv").config();
const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.DATABASE_URL) {
  // Jika aplikasi berjalan di Heroku, gunakan DATABASE_URL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "mysql",
    protocol: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Disable SSL certificate validation (untuk Heroku SSL)
      },
    },
  });
} else {
  // Jika lokal, gunakan konfigurasi yang ada di .env
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      logging: false, // Nonaktifkan logging query SQL
    }
  );
}

module.exports = sequelize;
