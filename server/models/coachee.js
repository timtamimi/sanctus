import { DataTypes } from 'sequelize';

export default function (db, DataTypes) {
  const Coachee = db.define('Coachee', {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    job: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Coachee.associate = (models) => {
    Coachee.hasMany(models.Session);
    Coachee.belongsTo(models.Partner);
  };

  return Coachee;
}
