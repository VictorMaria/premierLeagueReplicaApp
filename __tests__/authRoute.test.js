import request from 'supertest';
import jwtDecode from 'jwt-decode';
import app from '../index';
import mockerUsers from '../helpers/mockData/mockUsers';
 
const {
  missingFirstName,
  missingLastname,
  missingEmail,
  missingPassword,
  missingConfirmPassword,
  invalidEmail,
  passwordMismatch,
  correctDetails,
  wrongSignInEmail,
  wrongSignInPassword,
} = mockerUsers;
 
 
const ApiPrefix = '/api/v1';
describe('User sign up', () => {
  it('should return an error for missing firstName', async (done) => {
    const res = await request(app)
      .post(`${ApiPrefix}/auth/signup`)
      .send(missingFirstName)
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors.firstName).toEqual('First name is required');
    done();
  });
  it('should return an error for missing lastName', async (done) => {
    const res = await request(app)
      .post(`${ApiPrefix}/auth/signup`)
      .send(missingLastname)
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors.lastName).toEqual('Last name is required');
    done();
  });
  it('should return an error for missing email', async (done) => {
    const res = await request(app)
      .post(`${ApiPrefix}/auth/signup`)
      .send(missingEmail)
    expect(res.statusCode).toEqual(400)
    expect(res.body.errors.email).toEqual('Email is required')
    done();
  });
  it('should return an error for an invalid email', async (done) => {
    const res = await request(app)
      .post(`${ApiPrefix}/auth/signup`)
      .send(invalidEmail)
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors.email).toEqual('Please input a valid email address');
    done();
  });
  it('should return an error for missing password', async (done) => {
    const res = await request(app)
      .post(`${ApiPrefix}/auth/signup`)
      .send(missingPassword)
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors.password).toEqual('Password is required');
    done();
  });
  it('should return an error for missing confirm passord', async (done) => {
    const res = await request(app)
      .post(`${ApiPrefix}/auth/signup`)
      .send(missingConfirmPassword)
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors.password).toEqual('Passwords don\'t match');
    done();
  });
  it('should return an error for mismatched password and confirm passord', async (done) => {
    const res = await request(app)
      .post(`${ApiPrefix}/auth/signup`)
      .send(passwordMismatch)
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors.password).toEqual('Passwords don\'t match');
    done();
  });
  it('should sign up a user with the complete and correct details', async (done) => {
      const res = await request(app)
        .post(`${ApiPrefix}/auth/signup`)
        .send(correctDetails)
        const decoded = jwtDecode(res.body.user.token);
      expect(res.statusCode).toEqual(201);
      expect(res.body.user).toHaveProperty('token');
      expect(decoded).toHaveProperty('id');
      expect(decoded.firstName).toEqual(correctDetails.firstName);
      expect(decoded.lastName).toEqual(correctDetails.lastName);
      expect(decoded.email).toEqual(correctDetails.email);
      expect(decoded).toHaveProperty('avatar');
      expect(decoded.userType).toEqual('user');
      done();
    });
    it('should return an error for attempting to sign up with the same email twice', async (done) => {
      const res = await request(app)
        .post(`${ApiPrefix}/auth/signup`)
        .send(correctDetails)
      expect(res.statusCode).toEqual(409);
      expect(res.body.errors.message).toEqual('User already exists');
      done();
    });
  });