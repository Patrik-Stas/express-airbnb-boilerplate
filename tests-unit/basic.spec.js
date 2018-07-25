const winston = require('winston');

winston.add(new winston.transports.Console({ level: 'warn' }));

beforeAll(() => {
  // some global preparation
});

afterAll(() => {
  // setup
});


afterEach(() => {
  // cleanup
});


describe('unit tests suite name', () => {
  it('should be 200', async () => {
    expect(200).toBe(200);
  });
});
