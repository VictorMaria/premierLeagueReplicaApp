import moment from 'moment';
import client from '../helpers/redis';
import serverResponse from '../modules/serverResponse';
 
const { errorResponse } = serverResponse;
 
const rateLimiter = (req, res, next) => {
    const userId = req.user.id;
    client.get(userId, (err, result) => {
       if(result) {
        let details = JSON.parse(result)
        let currentTime = moment().unix()
        let timeFrame = (currentTime - details.startTime)/60;
        if (timeFrame >= 1) {
            let body = {
                'count': 1,
                'startTime': moment().unix()
              }
              client.set(userId, JSON.stringify(body))
              next()
        }
        if (timeFrame < 1) {
            if (details.count > 2) {
            return errorResponse(res, 429, 'You have exhuasted your 3 requests per minute quota');
            }
            details.count++
            client.set(userId, JSON.stringify(details))
            next()
        }
       } else {
        let body = {
            'count': 1,
            'startTime': moment().unix()
          }
          client.set(userId, JSON.stringify(body))
          next()
       }
    });
};
 
export default rateLimiter;