import { getAllCoachees } from '../repository/coachees.js';

export default (app) => {
  app.get('/coachees', (req, res) => {
    const partnerId = req.params?.partnerId;

    return getAllCoachees(partnerId);
  });
};
