import { getAllPartners } from '../repository/partners.js';

export default (app) => {
  app.get('/partners', async (req, res) => {
    return getAllPartners();
  });
};
