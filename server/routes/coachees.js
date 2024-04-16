import db from '../models/index.js';

export default (app) => {
  app.get('/coachees', (req, res) => {
    const partnerId = req.params?.partnerId;
    const where = {};

    if (partnerId) {
      where.partnerId = partnerId;
    }

    return db.Coachee.findAll({ where, include: [
        {model: db.Partner, required: true},
        {model: db.Session, required: false}
      ] });
  });
};
