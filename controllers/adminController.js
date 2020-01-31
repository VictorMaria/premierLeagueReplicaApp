import signUpHelper from '../helpers/signUpHelper';
import SignInHelper from '../helpers/signInHelper';
import serverResponse from '../modules/serverResponse';

 
const { signUpAction } = signUpHelper;
const { signInAction } = SignInHelper;
const { serverErrorResponse } = serverResponse;
 
class AdminController {
    static async signUpAdmin(req, res) {
    try {
        await signUpAction(req, res, 'admin');
        } catch (err) {
            return serverErrorResponse(err, req, res);
        };
    }
    static async signInAdmin(req, res) {
        try {
          await signInAction(req, res)
        } catch (err) {
          return serverErrorResponse(err, req, res);
        }
      }
}
 
export default AdminController;