module.exports = {
  "name": "default",
  "type": "mysql",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE,
  "synchronize": false,
  "logging": true,
  "entities": [
    "app/models/**/*.*"
  ],
  "migrations": [
    "app/migrations/**/*.*"
  ],
  "subscribers": [
    "app/subscribers/**/*.*"
  ],
  "cli": {
    "migrationsDir": "app/migrations"
  }
}
