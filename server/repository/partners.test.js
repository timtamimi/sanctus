import { getAllPartners } from './partners.js';

jest.mock('../models/index.js', () => {
  return {
    Partner: {
      findAll: jest.fn(() => [
        {
          dataValues: { expectedMonthlyUsage: 4 },
          Coachees: [{ Sessions: [1, 2, 3] }, { Sessions: [4, 5] }],
        },
      ]),
    },
  };
});

describe('fetch partners', () => {
  let response;
  beforeAll(async () => {
    response = await getAllPartners();
  });
  test('returns a sessionCount as part of the response', async () => {
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sessionCount: 5,
        }),
      ])
    );
  });
  test('returns a delta as part of the response', async () => {
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          delta: -1,
        }),
      ])
    );
  });
});
