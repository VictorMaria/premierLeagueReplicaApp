import serverResponse from '../modules/serverResponse';
import signUpHelper from '../helpers/signUpHelper';
import signInHelper from '../helpers/signInHelper' 

const { signUpAction } = signUpHelper;
const { signInAction } = signInHelper;
const { serverErrorResponse } = serverResponse;
 
class AuthController {
  static async signUp(req, res) {
    try {   
     await signUpAction(req, res, 'user');
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }
  static async signIn(req, res) {
    try {
      await signInAction(req, res, 'user')
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }
};
 
export default AuthController;