import signUpHelper from '../helpers/signUpHelper';
import serverResponse from '../modules/serverResponse';
 
const { signUpAction } = signUpHelper;
const { serverErrorResponse } = serverResponse;
 
class AdminController {
    static async signUpAdmin(req, res) {
    try {
        await signUpAction(req, res, 'admin');
        } catch (err) {
            return serverErrorResponse(err, req, res);
        };
    }
}
 
export default AdminController;