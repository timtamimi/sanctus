import db from '../models/index.js';

export const getSessions = async (limit = null, offset = null) => {
  return db.Session.findAll({
    include: [
      {
        model: db.Coachee,
        required: true,
        include: [
          {
            model: db.Partner,
            required: true,
          },
        ],
      },
      {
        model: db.Coach,
        required: true,
      },
    ],
    limit,
    offset,
  });
};
