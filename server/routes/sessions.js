import { getSessions } from '../repository/sessions.js';

export default (app) => {
  app.get('/sessions', (req, res) => {
    return getSessions(req.params.limit, req.params.offset);
  });
};
