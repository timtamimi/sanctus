import db from '../models/index.js';

export default (app) => {
  app.get('/coaches', (req, res) => {
    return db.Coach.findAll({
      include: [
        {
          model: db.Session,
          required: false
        }
      ]
    });
  });
};
