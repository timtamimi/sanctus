export default function (db, DataTypes) {
  const Partner = db.define('Partner', {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expectedMonthlyUsage: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });

  Partner.associate = (models) => {
    Partner.hasMany(models.Coachee);
  };

  return Partner;
}
