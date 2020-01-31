import User from '../models/User';
import Auth from './auth';
import serverResponse from '../modules/serverResponse';
import avatarFetcher from '../helpers/avatarFetcher';
 
const { successResponse } = serverResponse;
const { newToken, hashPassword } = Auth;
 
class SignUpHelper {
 static async signUpAction(req, res, userType) {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;
    // Fetch user avatar from gravatar
    const avatar = avatarFetcher(email);
    // An instance of User
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      avatar,
      userType,
      password,
    });
    user.password = hashPassword(password);
    // Saving new user instance into the db
      await user.save();
      // Payload for the new user's token
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        userType: user.userType,
      };
      const token = newToken(payload);
      return successResponse(res, 201, 'user', { message: 'You have Successfully Signed Up', token });
     
}
}
 
export default SignUpHelper