// import DBMysql from "./clients/db.mysql.js";

import './clients/db.sequelize.js';

;(async () => {
    async function runMigration() {
        let connection;
        try {
            connection = await mysql.createConnection(dbConfig);
            console.log('connected to migration');

            const createUsersTableSQL = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

            await connection.query(createUsersTableSQL);
            console.log('🚀 "Table created" successfully');

        } catch (error) {
            console.error('Error', error.message);
        }
    console.log('running connection...');
})();