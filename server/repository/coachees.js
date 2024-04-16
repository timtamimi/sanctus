import db from '../models/index.js';

export const getAllCoachees = (partnerId) => {
  const where = {};

  if (partnerId) {
    where.partnerId = partnerId;
  }

  return db.Coachee.findAll({
    where,
    include: [
      { model: db.Partner, required: true },
      { model: db.Session, required: false },
    ],
  });
};
