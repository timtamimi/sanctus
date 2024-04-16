import partners from './partners.js';
import coaches from './coaches.js';
import coachees from './coachees.js';
import sessions from './sessions.js';
import custom from './custom.js';

export default (app) => {
  partners(app);
  coaches(app);
  coachees(app);
  sessions(app);
  custom(app); // Holds weird organisational logic that isn't atomic REST
};
