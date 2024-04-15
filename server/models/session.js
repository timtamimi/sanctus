export default function (db, DataTypes) {
  const Session = db.define('Session', {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sessionStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    attended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Session.associate = (models) => {
    Session.belongsTo(models.Coach); // We could extend this such that a session can have multiple coaches.
    Session.belongsTo(models.Coachee); // We could extend this such that a session can have multiple coachees.
  };

  return Session;
}
