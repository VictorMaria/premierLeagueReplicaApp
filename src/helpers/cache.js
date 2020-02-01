import client from '../helpers/redis';
import serverResponse from '../modules/serverResponse'
 
const { successResponse } = serverResponse;
 
class Cache {
    static getCachedTeams(req, res, next) {
        client.get('teamsRedisKey', (err, result) => {
            if(err) throw err;
            if(result) {
                return successResponse(res, 200, 'TeamsCached', JSON.parse(result));
            } else {
                next();
            }
        })
    }
 
    static getCachedPendingFixtures(req, res, next) {
        client.get('pendingFixturesRedisKey', (err, result) => {
            if(err) throw err;
            if(result) {
                return successResponse(res, 200, 'PendingFixturesCached', JSON.parse(result));
            } else {
                next();
            }
        })
    }
 
    static getCachedCompletedFixtures(req, res, next) {
        client.get('completedFixturesRedisKey', (err, result) => {
            if(err) throw err;
            if(result) {
                return successResponse(res, 200, 'CompletedFixturesCached', JSON.parse(result));
            } else {
                next();
            }
        })
    }
 
    static getCachedSearchResults(req, res, next) {
        const keyword = req.query.keyword.toLowerCase();
        const wordRedisKey = `${keyword}RedisKey`;
        client.get(wordRedisKey, (err, result) => {
            if(err) throw err;
            if(result) {
                return successResponse(res, 200, 'SearchResultsCached', JSON.parse(result));
            } else {
                next();
            }
        })
    }
}
 
export default Cache;