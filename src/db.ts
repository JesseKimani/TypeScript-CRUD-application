import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('vehiclesdb', 'postgres', 'Javada99', {
    host: 'localhost',
    dialect: 'postgres',
  });

sequelize.sync({ force: false}).then(() => {
    console.log('DB and tables synchronized');
});

export default sequelize;
