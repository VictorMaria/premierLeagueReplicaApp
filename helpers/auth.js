import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcryptjs';
import { config } from 'dotenv';
 
config();
 
class Auth {
  static newToken(payload) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '24d' });
  }
 
  static hashPassword(password) {
    return hashSync(password, 10);
  }
 
  static comparePassword(password, hashPassword) {
    return compareSync(password, hashPassword);
  }
}
 
export default Auth;