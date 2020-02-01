import request from 'supertest';
import app from '../sampleApp';
import mockAdmins from '../helpers/mockData/mockAdmins';
import mockFixtures from '../helpers/mockData/mockFixtures';

const { newAdmin, correctDetails } = mockAdmins;
const {
    missingHomeTeam,
    missingAwayTeam,
    missingStadium,
    missingHappeningOn,
    missingReferee,
    missingCity,
    missingCountry,
    invalidDateTime,
    sameTeams,
    firstFixture,
    secondFixture,
    thirdFixture,
} = mockFixtures;


let userToken;
let adminToken;
const ApiPrefix = '/api/v1';


beforeAll(async () => {
    const userRes = await request(app)
      .post(`${ApiPrefix}/auth/signup`)
      .send({
          firstName: 'user',
          lastName: 'two',
          email: 'usertwo@mail.com',
          password: correctDetails.password,
          confirmPassword: correctDetails.password,
      })
    const adminRes = await request(app)
      .post(`${ApiPrefix}/admin/signup`)
      .send(newAdmin);
      userToken = userRes.body.user.token; 
      adminToken = adminRes.body.user.token;
    });

    describe('Add Fixtures', () => {
        it('should return an error for missing Home Team', async (done) => {
            const res = await request(app)
              .post(`${ApiPrefix}/fixtures`)
              .send(missingHomeTeam)
              .set('Authorization', `Bearer ${adminToken}`)
            expect(res.statusCode).toEqual(400);
            expect(res.body.errors.homeTeam).toEqual('Home Team is required');
            done();
          });
          it('should return an error for missing Away Team', async (done) => {
            const res = await request(app)
              .post(`${ApiPrefix}/fixtures`)
              .send(missingAwayTeam)
              .set('Authorization', `Bearer ${adminToken}`)
            expect(res.statusCode).toEqual(400);
            expect(res.body.errors.awayTeam).toEqual('Away Team is required');
            done();
          });  
          it('should return an error for missing stadium', async (done) => {
            const res = await request(app)
              .post(`${ApiPrefix}/fixtures`)
              .send(missingStadium)
              .set('Authorization', `Bearer ${adminToken}`)
            expect(res.statusCode).toEqual(400);
            expect(res.body.errors.stadium).toEqual('Stadium is required');
            done();
          });
          it('should return an error for home and away team being the same', async (done) => {
            const res = await request(app)
              .post(`${ApiPrefix}/fixtures`)
              .send(sameTeams)
              .set('Authorization', `Bearer ${adminToken}`)
            expect(res.statusCode).toEqual(400);
            expect(res.body.errors.awayTeam).toEqual('Home and Away Teams have to be different');
            done();
          });
          it('should return an error for missing date and time', async (done) => {
            const res = await request(app)
              .post(`${ApiPrefix}/fixtures`)
              .send(missingHappeningOn)
              .set('Authorization', `Bearer ${adminToken}`)
            expect(res.statusCode).toEqual(400);
            expect(res.body.errors.happeningOn).toEqual('happeningOn is required');
            done();
          });
          it('should return an error for missing referee', async (done) => {
            const res = await request(app)
              .post(`${ApiPrefix}/fixtures`)
              .send(missingReferee)
              .set('Authorization', `Bearer ${adminToken}`)
            expect(res.statusCode).toEqual(400);
            expect(res.body.errors.referee).toEqual('Referee is required');
            done();
          });
          it('should return an error for missing city', async (done) => {
            const res = await request(app)
              .post(`${ApiPrefix}/fixtures`)
              .send(missingCity)
              .set('Authorization', `Bearer ${adminToken}`)
            expect(res.statusCode).toEqual(400);
            expect(res.body.errors.city).toEqual('City is required');
            done();
          });
          it('should return an error for missing country', async (done) => {
            const res = await request(app)
              .post(`${ApiPrefix}/fixtures`)
              .send(missingCountry)
              .set('Authorization', `Bearer ${adminToken}`)
            expect(res.statusCode).toEqual(400);
            expect(res.body.errors.country).toEqual('Country is required');
            done();
          });
          it('should return an error for invalid date and time format', async (done) => {
            const res = await request(app)
              .post(`${ApiPrefix}/fixtures`)
              .send(invalidDateTime)
              .set('Authorization', `Bearer ${adminToken}`)
            expect(res.statusCode).toEqual(400);
            expect(res.body.errors.happeningOn).toEqual('happeningOn must follow YYYY-MM-DDTHH:MM format');
            done();
          });
          it('should return success when admin enters valid and complete details', async (done) => {
            const res = await request(app)
              .post(`${ApiPrefix}/fixtures`)
              .send(firstFixture)
              .set('Authorization', `Bearer ${adminToken}`)
            expect(res.statusCode).toEqual(201);
            expect(res.body.Fixture.homeTeam.name).toEqual(firstFixture.homeTeam.toLowerCase());
            expect(res.body.Fixture.awayTeam.name).toEqual(firstFixture.awayTeam.toLowerCase());
            done();
          });
          it('should return success when admin enters valid and complete details', async (done) => {
            const res = await request(app)
              .post(`${ApiPrefix}/fixtures`)
              .send(secondFixture)
              .set('Authorization', `Bearer ${adminToken}`)
            expect(res.statusCode).toEqual(201);
            expect(res.body.Fixture.homeTeam.name).toEqual(secondFixture.homeTeam.toLowerCase());
            expect(res.body.Fixture.awayTeam.name).toEqual(secondFixture.awayTeam.toLowerCase());
            done();
          });
          it('should return success when admin enters valid and complete details', async (done) => {
            const res = await request(app)
              .post(`${ApiPrefix}/fixtures`)
              .send(thirdFixture)
              .set('Authorization', `Bearer ${adminToken}`)
            expect(res.statusCode).toEqual(201);
            expect(res.body.Fixture.homeTeam.name).toEqual(thirdFixture.homeTeam.toLowerCase());
            expect(res.body.Fixture.awayTeam.name).toEqual(thirdFixture.awayTeam.toLowerCase());
            done();
          });
    })    
