import request from 'supertest';
import app from '../sampleApp';
import mockAdmins from '../helpers/mockData/mockAdmins';
import mockFixtures from '../helpers/mockData/mockFixtures';



const {
    invalidIdempotencyKey,
    missingIdempotencyKey,
    oneOtherFixture,
 } = mockFixtures;

 const { correctDetails } = mockAdmins;

 let adminToken;
 const ApiPrefix = '/api/v1';

 beforeAll(async () => {
    const adminResponse = await request(app)
      .post(`${ApiPrefix}/admin/signup`)
      .send({
          firstName: 'Christoper',
          lastName: 'Taylor',
          email: 'chris.taylor@mail.com',
          password: correctDetails.password,
          confirmPassword: correctDetails.password,
      })
        adminToken = adminResponse.body.admin.token;
});

describe('idempotency key test for preventing accidental double entry of a new fixture', () => {
    it('should return an error for an invalid idempotency key', async (done) => {
        const res = await request(app)
          .post(`${ApiPrefix}/fixtures`)
          .send(invalidIdempotencyKey)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors.idempotencyKey).toEqual('Idempotency key must be a valid UUID');
        done();
      });
    it('should return error for request without an idempotency key', async (done) => {
        const res = await request(app)
          .post(`${ApiPrefix}/fixtures`)
          .send(missingIdempotencyKey)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors.idempotencyKey).toEqual('idempotencyKey is required');
        done();
      });      
    it('should create a fixture, if the idempotency key is not existing in the database and return 201', async (done) => {
     const res = await request(app)
       .post(`${ApiPrefix}/fixtures`)
       .send(oneOtherFixture)
       .set('Authorization', `Bearer ${adminToken}`)
    expect(res.statusCode).toEqual(201);
    expect(res.body.Fixture.message).toEqual('Fixture Added!');
    done();
  });
    it('should return the same fixture, if the idempotency key is existing in the database and return 200', async (done) => {
    const res = await request(app)
      .post(`${ApiPrefix}/fixtures`)
      .send(oneOtherFixture)
      .set('Authorization', `Bearer ${adminToken}`)
   expect(res.statusCode).toEqual(200);
   expect(res.body.Fixture.message).toEqual('Fixture already added!');
   done();
 });
});  