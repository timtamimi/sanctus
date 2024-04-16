import {
  getAverageAttendanceRate,
  getCoachesByPartner,
  getTopOverUsingPartners,
  getTopUnderUsingPartners,
} from '../repository/custom.js';

export default (app) => {
  app.get('/custom/key-stats', async (req, res) => {
    const averageAttendanceRate = await getAverageAttendanceRate();
    const topOverUsingPartners = await getTopOverUsingPartners();
    const topUnderUsingPartners = await getTopUnderUsingPartners();
    const coachesByPartner = await getCoachesByPartner();

    return {
      averageAttendanceRate,
      topOverUsingPartners,
      topUnderUsingPartners,
      coachesByPartner,
    };
  });
};
