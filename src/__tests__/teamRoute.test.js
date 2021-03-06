import request from 'supertest';
import app from '../sampleApp';
import mockTeams from '../helpers/mockData/mockTeams';
import mockAdmins from '../helpers/mockData/mockAdmins';

const {
        missingTeamName,
        missingManager,
        missingStadium,
        missingWebsite,
        secondCompleteTeamDetails,
        completeTeamDetails,
        thirdCompleteTeamDetails,
        teamToEdit,
        teamToDelete,
    } = mockTeams;

const { correctDetails } = mockAdmins;

let userToken
let adminToken;
let teamId;
let teamToDeleteId;
const ApiPrefix = '/api/v1'

beforeAll(async () => {
    const userRes = await request(app)
      .post(`${ApiPrefix}/auth/signup`)
      .send({
          firstName: 'user',
          lastName: 'one',
          email: 'userone@mail.com',
          password: correctDetails.password,
          confirmPassword: correctDetails.password,
      })
    const adminRes = await request(app)
      .post(`${ApiPrefix}/admin/signup`)
      .send({
          firstName: 'Admin',
          lastName: 'One',
          email: 'adminone@mail.com',
          password: correctDetails.password,
          confirmPassword: correctDetails.password
      });
      userToken = userRes.body.user.token; 
      adminToken = adminRes.body.admin.token;
    });
describe('Add Teams', () => {
    it('should return an error for missing teamName', async (done) => {
        const res = await request(app)
          .post(`${ApiPrefix}/teams`)
          .send(missingTeamName)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors.teamName).toEqual('Team Name is required');
        done();
      });
      it('should return an error for missing manager', async (done) => {
        const res = await request(app)
          .post(`${ApiPrefix}/teams`)
          .send(missingManager)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors.manager).toEqual('Manager is required');
        done();
      });
      it('should return an error for missing stadium', async (done) => {
        const res = await request(app)
          .post(`${ApiPrefix}/teams`)
          .send(missingStadium)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors.stadium).toEqual('Stadium is required');
        done();
      });
      it('should return an error for missing website', async (done) => {
        const res = await request(app)
          .post(`${ApiPrefix}/teams`)
          .send(missingWebsite)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors.website).toEqual('Website is required');
        done();
      });
      it('should return an error for missing token', async (done) => {
        const res = await request(app)
          .post(`${ApiPrefix}/teams`)
          .send(completeTeamDetails)
          .set('Authorization', '')
        expect(res.statusCode).toEqual(401);
        expect(res.body.errors.message).toEqual('No token provided');
        done();
      });
      it('should return error for an invalid token', async (done) => {
          const res = await request(app)
            .post(`${ApiPrefix}/teams`)
            .set('Authorization', `${adminToken}s`)
          expect(res.statusCode).toEqual(401);
          expect(res.body.errors.message).toEqual('Invalid token provided');
          done();
      })
      it('should return an error for a user attempting to add a team', async (done) => {
        const res = await request(app)
          .post(`${ApiPrefix}/teams`)
          .send(completeTeamDetails)
          .set('Authorization', `Bearer ${userToken}`)
        expect(res.statusCode).toEqual(403);
        expect(res.body.errors.message).toEqual('User not authorized');
        done();
      });
      it('should return add team successfully if details are correct', async (done) => {
        const res = await request(app)
          .post(`${ApiPrefix}/teams`)
          .send(completeTeamDetails)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(201);
        expect(res.body.Team.teamName).toEqual((completeTeamDetails.teamName).toLocaleLowerCase());
        expect(res.body.Team.manager).toEqual(completeTeamDetails.manager);
        expect(res.body.Team.stadium).toEqual(completeTeamDetails.stadium);
        expect(res.body.Team.website).toEqual(completeTeamDetails.website);
        done();
      });
      it('should add team successfully if second details are correct', async (done) => {
        const res = await request(app)
          .post(`${ApiPrefix}/teams`)
          .send(secondCompleteTeamDetails)
          .set('Authorization', `Bearer ${adminToken}`)
          teamId = res.body.Team.id;
        expect(res.statusCode).toEqual(201);
        expect(res.body.Team.teamName).toEqual((secondCompleteTeamDetails.teamName).toLocaleLowerCase());
        expect(res.body.Team.manager).toEqual(secondCompleteTeamDetails.manager);
        expect(res.body.Team.stadium).toEqual(secondCompleteTeamDetails.stadium);
        expect(res.body.Team.website).toEqual(secondCompleteTeamDetails.website);
        done();
      });
      it('should return error for already existing team', async (done) => {
        const res = await request(app)
          .post(`${ApiPrefix}/teams`)
          .send(completeTeamDetails)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors.message).toEqual('This Team already exists');
        done();
      });
      it('should return all teams', async (done) => {
        const res = await request(app)
          .get(`${ApiPrefix}/teams`)
          .set('Authorization', `Bearer ${userToken}`)
        expect(res.statusCode).toEqual(200);
        done();
      });
      it('should return result from cach on calling getAllTeams a second time', async (done) => {
        const res = await request(app)
          .get(`${ApiPrefix}/teams`)
          .set('Authorization', `Bearer ${userToken}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('TeamsCached');
        expect(res.body.TeamsCached).toHaveLength(2);
        done();
      });
      it('should return an error for an invalid team id', async (done) => {
        const res = await request(app)
          .get(`${ApiPrefix}/teams/5e3523139980fe1ef1ee207fyy`)
          .set('Authorization', `Bearer ${userToken}`)
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors.id).toEqual('id is not valid');
        done();
      });
      it('should return result upon fetching a single team', async (done) => {
        const res = await request(app)
          .get(`${ApiPrefix}/teams/${teamId}`)
          .set('Authorization', `Bearer ${userToken}`)
        expect(res.statusCode).toEqual(200);  
        expect(res.body.Team.id).toEqual(teamId);
        done();
      });
      it('should return a 404 for a non existing team', async (done) => {
        const res = await request(app)
          .get(`${ApiPrefix}/teams/5e3523139980fe1ef1ee207f`)
          .set('Authorization', `Bearer ${userToken}`)
        expect(res.statusCode).toEqual(404);
        expect(res.body.errors.message).toEqual('Team not found');
        done();
      });
      it('should return details of a team and fixtures', async (done) => {
        const res = await request(app)
          .get(`${ApiPrefix}/teams/search?keyword=kiwi fc`)
          .set('Authorization', `Bearer ${userToken}`)
        expect(res.statusCode).toEqual(200);
        done();
      });
      it('should edit team successfully if details are correct', async (done) => {
        const res = await request(app)
          .patch(`${ApiPrefix}/teams/${teamId}`)
          .send(teamToEdit)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body.Team.teamName).toEqual((teamToEdit.teamName).toLocaleLowerCase());
        expect(res.body.Team.manager).toEqual(teamToEdit.manager);
        expect(res.body.Team.stadium).toEqual(teamToEdit.stadium);
        expect(res.body.Team.website).toEqual(teamToEdit.website);
        expect(res.body.Team).toHaveProperty('updatedAt');
        done();
      });
      it('should add another team successfully', async (done) => {
        const res = await request(app)
          .post(`${ApiPrefix}/teams`)
          .send(teamToDelete)
          .set('Authorization', `Bearer ${adminToken}`)
          teamToDeleteId = res.body.Team.id;
        done();
      });
      it('should delete a team', async (done) => {
        const res = await request(app)
          .delete(`${ApiPrefix}/teams/${teamToDeleteId}`)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body.team.message).toEqual('Team deleted!');
        done();
      });
      it('should return 404 to ensure teamToDelete was deleted', async (done) => {
        const res = await request(app)
          .delete(`${ApiPrefix}/teams/${teamToDeleteId}`)
          .set('Authorization', `Bearer ${adminToken}`)
        expect(res.statusCode).toEqual(404);
        expect(res.body.errors.message).toEqual('Team not found');
        done();
      });
});
  