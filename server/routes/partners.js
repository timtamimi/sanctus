import db from '../models/index.js';

export default (app) => {
  app.get('/partners', async (req, res) => {
    const partners = await db.Partner.findAll({
      include: [
        {
          model: db.Coachee,
          include: [
            {
              model: db.Session,
            },
          ],
        },
      ],
    });

    const parsedPartners = partners.map((eachPartner) => {
      const sessionCount = eachPartner.Coachees.reduce((a, b) => a + b?.Sessions?.length, 0);
      return {
        ...eachPartner.dataValues,
        sessionCount,
        delta: eachPartner.dataValues.expectedMonthlyUsage - sessionCount,
      };
    });

    return parsedPartners;
  });
};
