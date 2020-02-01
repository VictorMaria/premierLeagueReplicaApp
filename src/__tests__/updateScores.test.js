import request from 'supertest';
import app from '../sampleApp';
import mockAdmins from '../helpers/mockData/mockAdmins';
import mockFixtures from '../helpers/mockData/mockFixtures';



const {
    finalFixture,
 } = mockFixtures;

 const { correctDetails } = mockAdmins;

 let adminToken;
 let fixtureId;
 const ApiPrefix = '/api/v1';

 beforeAll(async () => {
    const adminResponse = await request(app)
      .post(`${ApiPrefix}/admin/signup`)
      .send({
          firstName: 'admin',
          lastName: 'Taylor',
          email: 'admin.taylor@mail.com',
          password: correctDetails.password,
          confirmPassword: correctDetails.password,
      })
        adminToken = adminResponse.body.user.token;
    const fixtureResponse = await request(app)
      .post(`${ApiPrefix}/fixtures`)
      .send(finalFixture)
      .set('Authorization', `Bearer ${adminToken}`)
      fixtureId = fixtureResponse.body.Fixture.id;
});

describe('admin increment and decrement scores', () => {
    it('should increment home team score by one', async (done) => {
        const res = await request(app)
          .patch(`${ApiPrefix}/fixtures/${fixtureId}/hometeam/inc`)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body.Fixture.homeTeam.score).toEqual(1);
        done();
      });
      it('should decrement home team score by one', async (done) => {
        const res = await request(app)
          .patch(`${ApiPrefix}/fixtures/${fixtureId}/hometeam/dcr`)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body.Fixture.homeTeam.score).toEqual(0);
        done();
      });
      it('should not decrement home team score by one if current score is zero', async (done) => {
        const res = await request(app)
          .patch(`${ApiPrefix}/fixtures/${fixtureId}/hometeam/dcr`)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body.Fixture.homeTeam.score).toEqual(0);
        expect(res.body.Fixture.message).toEqual('Home Team\'s Score cannot be decreased below 0!')
        done();
      });
      it('should increment away team score by one', async (done) => {
        const res = await request(app)
          .patch(`${ApiPrefix}/fixtures/${fixtureId}/awayteam/inc`)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body.Fixture.awayTeam.score).toEqual(1);
        done();
      });
      it('should decrement away team score by one', async (done) => {
        const res = await request(app)
          .patch(`${ApiPrefix}/fixtures/${fixtureId}/awayteam/dcr`)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body.Fixture.awayTeam.score).toEqual(0);
        done();
      });
      it('should not decrement away team score by one if current score is zero', async (done) => {
        const res = await request(app)
          .patch(`${ApiPrefix}/fixtures/${fixtureId}/awayteam/dcr`)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body.Fixture.homeTeam.score).toEqual(0);
        expect(res.body.Fixture.message).toEqual('Away Team\'s Score cannot be decreased below 0!')
        done();
      });
    });