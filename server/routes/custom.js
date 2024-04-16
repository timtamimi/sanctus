import queries from './helpers/queries.js'
import db from '../models/index.js';

export default (app) => {
  app.get('/custom/key-stats', async (req, res) => {
    const [averageAttendanceRateQuery] = await db.query(queries.averageAttendanceRateQuery);
    const [{averageAttendanceRate}] = averageAttendanceRateQuery;

    const [topOverUsingPartners] = await db.query(queries.topPartnersByUsageQuery("desc", 10));

    const [topUnderUsingPartners] = await db.query(queries.topPartnersByUsageQuery("asc", 10));

    const [busiestCoachByPartner] = await db.query(queries.coachUtilisationBypartner)

    return {
      averageAttendanceRate,
      topOverUsingPartners,
      topUnderUsingPartners,
      busiestCoachByPartner
    };
  });
};
