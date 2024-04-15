import { Sequelize, DataTypes } from 'sequelize';
import Coach from './coach.js';
import Partner from './partner.js';
import Coachee from './coachee.js';
import Session from './session.js';

const sequelize = new Sequelize('sqlite://:memory:', {
  logging: true,
});

sequelize['Partner'] = Partner(sequelize, DataTypes);
sequelize['Coach'] = Coach(sequelize, DataTypes);
sequelize['Coachee'] = Coachee(sequelize, DataTypes);
sequelize['Session'] = Session(sequelize, DataTypes);

Object.keys(sequelize).forEach((modelName) => {
  if (sequelize[modelName].associate) {
    sequelize[modelName].associate(sequelize);
  }
});
export default sequelize;
