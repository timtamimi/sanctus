import moment from 'moment';
import { v4 as uuid } from 'uuid';
import db from './index.js';
import partners from '../raw_data/partners.json' with { type: 'json' };
import coachees from '../raw_data/coachees.json' with { type: 'json' };
import sessions from '../raw_data/sessions.json' with { type: 'json' };
export default async () => {
  // Partners
  await db.Partner.bulkCreate(partners, { ignoreDuplicates: true });

  // Coaches
  const coachesFromSessions = sessions.map((eachSession) => ({ email: eachSession.coach }));
  await db.Coach.bulkCreate(
    coachesFromSessions.map((eachCoach) => ({
      email: eachCoach.email,
    })),
    { ignoreDuplicates: true }
  );

  // Coachees
  await db.Coachee.bulkCreate(
    coachees.map((eachCoachee) => ({
      ...eachCoachee,
      PartnerId: eachCoachee.partner,
    })),
    { ignoreDuplicates: true }
  );

  // Sessions
  await db.Session.bulkCreate(
    sessions.map((eachSession) => ({
      id: uuid(),
      attended: eachSession.attended,
      CoacheeId: eachSession.coachee,
      CoachEmail: eachSession.coach,
      sessionStart: moment(eachSession.sessionStart, 'HH:mm DD/MM/YYYY').toDate(),
    }))
  );
};
