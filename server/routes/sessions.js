import db from '../models/index.js';

export default (app) => {
  app.get('/sessions', (req, res) => {
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
    });
  });
};
