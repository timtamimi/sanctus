import partners from './partners.js';
import coaches from './coaches.js';
import coachees from './coachees.js';
import sessions from './sessions.js';

export default (app) => {
  partners(app);
  coaches(app);
  coachees(app);
  sessions(app);
};
