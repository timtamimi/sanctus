import db from '../models/index.js';

export const getAllPartners = async () => {
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
    const attendedSessions = eachPartner.Coachees.reduce((a, b) => a + b?.Sessions?.filter(session => session.attended).length, 0);
    const attendanceRate = attendedSessions/sessionCount;
    return {
      ...eachPartner.dataValues,
      sessionCount,
      attendanceRate,
      delta: eachPartner.dataValues.expectedMonthlyUsage - sessionCount,
    };
  });

  return parsedPartners;
};
