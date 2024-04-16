import db from '../models/index.js';

export const getAllCoaches = () => {
  return db.Coach.findAll({
    include: [
      {
        model: db.Session,
        required: false,
      },
    ],
  });
};
