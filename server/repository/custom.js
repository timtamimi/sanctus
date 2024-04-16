import db from '../models/index.js';
import queries from './helpers/queries.js';

export const getAverageAttendanceRate = async () => {
  const [averageAttendanceRateQuery] = await db.query(queries.averageAttendanceRateQuery);
  const [{ averageAttendanceRate }] = averageAttendanceRateQuery;
  return averageAttendanceRate;
};

export const getTopOverUsingPartners = async () => {
  const [topOverUsingPartners] = await db.query(queries.topPartnersByUsageQuery('desc', 10));
  return topOverUsingPartners;
};

export const getTopUnderUsingPartners = async () => {
  const [topUnderUsingPartners] = await db.query(queries.topPartnersByUsageQuery('asc', 10));
  return topUnderUsingPartners;
};

export const getCoachesByPartner = async () => {
  const [coachesByPartner] = await db.query(queries.coachUtilisationByPartner);
  return coachesByPartner;
};
