export default function (db, DataTypes) {
  const Coach = db.define('Coach', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });

  Coach.associate = (models) => {
    Coach.hasMany(models.Session);
  };

  return Coach;
}
