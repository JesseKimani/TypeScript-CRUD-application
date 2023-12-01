// connection.ts
import { createConnection } from 'typeorm';

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  entities: [__dirname + '/models/*.ts'],
  synchronize: true, // Set to false in production
  logging: true,
})
  .then((connection) => console.log('Connected to the database'))
  .catch((error) => console.log('Error connecting to the database:', error));

  