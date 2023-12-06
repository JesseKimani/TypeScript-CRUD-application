import { Sequelize } from 'sequelize';
import config from '../sequelize.config';
import { User } from './models/user.model';

// const sequelize = new Sequelize(config.development);

const sequelize = new Sequelize('vehicles', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

sequelize.sync({ force: false}).then(() => {
    console.log('DB and tables synchronized');
});





export default sequelize;
