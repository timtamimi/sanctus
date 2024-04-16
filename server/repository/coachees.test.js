import { getAllCoachees } from './coachees.js';
import db from '../models/index.js';

jest.mock('../models/index.js', () => {
  return {
    Coachee: { findAll: jest.fn() },
  };
});
describe('fetch coachees', () => {
  describe('without specifying partnerId', () => {
    beforeAll(async () => {
      await getAllCoachees(null);
    });
    test('calls the ORM with a query sans-PartnerId', async () => {
      expect(db.Coachee.findAll).toBeCalledWith(
        expect.objectContaining({
          where: {},
        })
      );
    });
  });

  test('with specifying partnerId', async () => {
    const result = await getAllCoachees('some-id');
    expect(db.Coachee.findAll).toBeCalledWith(
      expect.objectContaining({
        where: {
          partnerId: 'some-id',
        },
      })
    );
  });
});
