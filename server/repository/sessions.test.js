import { getSessions } from './sessions.js';
import db from '../models/index.js';

jest.mock('../models/index.js', () => {
  return {
    Session: {
      findAll: jest.fn(),
    },
  };
});

describe('fetch sessions without passing pagination options', () => {
  let response;
  beforeAll(async () => {
    response = await getSessions();
  });
  test('calls the ORM for as many elements as it can find', async () => {
    expect(db.Session.findAll).toBeCalledWith(
      expect.objectContaining({
        limit: null,
      })
    );
  });
});

describe('fetch sessions with passing pagination options', () => {
  describe('passing limit:10, offset: null', () => {
    let response;
    beforeAll(async () => {
      response = await getSessions(10, undefined);
    });
    test('calls the ORM with a given limit', async () => {
      expect(db.Session.findAll).toBeCalledWith(
        expect.objectContaining({
          limit: 10,
        })
      );
    });
  });

  describe('passing limit:10, offset: 50', () => {
    let response;
    beforeAll(async () => {
      response = await getSessions(10, 50);
    });
    test('calls the ORM with a given limit', async () => {
      expect(db.Session.findAll).toBeCalledWith(
        expect.objectContaining({
          limit: 10,
          offset: 50,
        })
      );
    });
  });
});
