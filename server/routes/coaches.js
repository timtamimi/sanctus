import { getAllCoaches } from '../repository/coaches.js';

export default (app) => {
  app.get('/coaches', (req, res) => {
    return getAllCoaches();
  });
};
