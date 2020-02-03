import User from '../models/User';
import Auth from './auth';
import serverResponse from '../modules/serverResponse';
 
const { successResponse, serverErrorResponse } = serverResponse;
const { newToken, comparePassword } = Auth;
 
class SignInHelper {
 static async signInAction(req, res, userType) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({ errors: { message: 'Incorrect Credentials' } });
      }
      const result = comparePassword(password, user.password);
      if (!result) {
        return res.status(401).json({ errors: { message: 'Incorrect Credentials' } });
      }
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        userType: user.userType,
      };
      const token = newToken(payload);
      return successResponse(res, 200, userType, { message: 'You have Successfully Signed In', token });
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }
};
 
export default SignInHelper;
