import db from '../models/index.js';

export default (app) => {
  app.get('/partners', (req, res) => {
    return db.Partner.findAll();
  });
};
