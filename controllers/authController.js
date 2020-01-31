import serverResponse from '../modules/serverResponse';
import signUpHelper from '../helpers/signUpHelper';
 
const { signUpAction } = signUpHelper;
const { serverErrorResponse } = serverResponse;
 
class AuthController {
  static async signUp(req, res) {
    try {   
     await signUpAction(req, res, 'user');
    } catch (err) {
      return serverErrorResponse(err, req, res);
    }
  }
};
 
export default AuthController;