import Fixture from '../models/Fixture';
import moment from 'moment';
import serverResponse from '../modules/serverResponse';
import client from '../helpers/redis';
 
const { successResponse, serverErrorResponse, errorResponse } = serverResponse;
 
class FixtureController {
    static async addFixture(req, res) {
        const adminId = req.user.id;
        const { homeTeam, awayTeam, stadium, city, country, referee, happeningOn } = req.body;
        const newFixture = new Fixture({
           adminId,
           'homeTeam.name': homeTeam.toLowerCase(),
           'awayTeam.name': awayTeam.toLowerCase(),
           'venue.stadium': stadium.toLowerCase(),
           'venue.city': city.toLowerCase(),
           'venue.country': country.toLowerCase(),
           referee,
           happeningOn: moment.utc(happeningOn),
        })
        try {
        const fixture = await newFixture.save();
        return successResponse(res, 201, 'Fixture', {
            message: 'Fixture Added!',
            id: fixture.id,
            homeTeam: fixture.homeTeam,
            awayTeam: fixture.awayTeam,
            venue: fixture.venue,
            referee: fixture.referee,
            happeningOn: fixture.happeningOn,
        }) 
    } catch (err){
           return serverErrorResponse(err, req, res);
    }
 }

 static async getFixture(req, res) {
    const fixtureId = req.params.id;
    try {
        const checkFixture = await Fixture.findOne({ _id: fixtureId});
        if(!checkFixture) {
            return errorResponse(res, 404, { message: 'Fixture not found' });
        }
        return successResponse(res, 200, 'Fixture', {
            message: 'Here you go!',
            id: checkFixture.id,
            homeTeam: checkFixture.homeTeam,
            awayTeam: checkFixture.awayTeam,
            venue: checkFixture.venue,
            referee: checkFixture.referee,
            happeningOn: checkFixture.happeningOn,
        })
    } catch(err) {
        console.log(err)
        return serverErrorResponse(err, req, res);
    }
}

static async getFixtureForAdmin(req, res) {
    const fixtureId = req.params.id;
    try {
        const checkFixture = await Fixture.findOne({ _id: fixtureId});
        if(!checkFixture) {
            return errorResponse(res, 404, { message: 'Fixture not found' });
        }
        return successResponse(res, 200, 'Fixture', {
            message: 'Here you go!',
            id: checkFixture.id,
            homeTeam: checkFixture.homeTeam,
            awayTeam: checkFixture.awayTeam,
            venue: checkFixture.venue,
            referee: checkFixture.referee,
            happeningOn: checkFixture.happeningOn,
            addedAt: checkFixture.addedAt,
            updatedAt: checkFixture.updatedAt,
        })
    } catch(err) {
        return serverErrorResponse(err, req, res);
    }
}

static async getCompletedFixtures (req, res) {
    try {
        const completedFixtures = await Fixture.find({
            happeningOn: { $lt: new Date() } }).sort({ happeningOn: 1 });
            client.setex('completedFixturesRedisKey', 2800, JSON.stringify(completedFixtures));
        return successResponse(res, 200, 'CompletedFixtures', completedFixtures);
    } catch(err) {
        console.log(err)
        return serverErrorResponse(err, req, res);
    }
}

static async getPendingFixtures (req, res) {
    try {
        const pendingFixtures = await Fixture.find({
            happeningOn: { $gt: new Date() } }).sort({ happeningOn: 1 });
            client.setex('pendingFixturesRedisKey', 2800, JSON.stringify(pendingFixtures))
        return successResponse(res, 200, 'Pending Fixtures', pendingFixtures);
    } catch(err) {
        console.log(err)
        return serverErrorResponse(err, req, res);
    }
}

 static async editFixture(req, res) {
    const fixtureId = req.params.id;
    const { homeTeam, awayTeam, stadium, city, country, referee, happeningOn } = req.body;
    try {
        const checkFixture = await Fixture.findOne({ _id: fixtureId});
        if(!checkFixture) {
            return errorResponse(res, 404, { message: 'Fixture not found' });
        }
        const updateFixture = await Fixture.findOneAndUpdate(
            { _id: fixtureId },
            { $set: { 'homeTeam.name': homeTeam.toLowerCase(),
                      'awayTeam.name': awayTeam.toLowerCase(),
                      'venue.stadium': stadium.toLowerCase(),
                      'venue.city': city.toLowerCase(),
                      'venue.country': country.toLowerCase(),
                      referee,
                      happeningOn: moment.utc(happeningOn),
                      updatedAt: new Date() } },
            { new: true },
          );
          return successResponse(res, 200, 'Fixture', {
            message: 'Fixture Edited!',
            id: updateFixture.id,
            homeTeam: updateFixture.homeTeam,
            awayTeam: updateFixture.awayTeam,
            venue: updateFixture.venue,
            referee: updateFixture.referee,
            happeningOn: updateFixture.happeningOn,
            addedAt: updateFixture.addedAt,
            updatedAt: updateFixture.updatedAt
          });
} catch (err) {
    return serverErrorResponse(err, req, res);
        }
    }
static async incrementHomeTeamScore(req, res) {
    const fixtureId = req.params.id;
    try {
        const checkFixture = await Fixture.findOne({ _id: fixtureId});
        if(!checkFixture) {
            return errorResponse(res, 404, { message: 'Fixture not found' });            }
            const updateScore = await Fixture.findOneAndUpdate(
                { _id: fixtureId },
                { $inc: { 'homeTeam.score': 1 },
                          updatedAt: new Date()  },
                { new: true },
              );
            return successResponse(res, 200, 'Fixture', {
                message: 'Score Updated!',
                id: updateScore.id,
                homeTeam: updateScore.homeTeam,
                awayTeam: updateScore.awayTeam,
                referee: updateScore.referee,
                happeningOn: updateScore.happeningOn,
                addedAt: updateScore.addedAt,
                updatedAt: updateScore.updatedAt
              });
    } catch (err) {
        console.log(err)
        return serverErrorResponse(err, req, res);
            }
    }
     
static async incrementAwayTeamScore(req, res) {
        const fixtureId = req.params.id;
        try {
            const checkFixture = await Fixture.findOne({ _id: fixtureId});
              if(!checkFixture) {
                    return errorResponse(res, 404, { message: 'Fixture not found' });
                }
            const updateScore = await Fixture.findOneAndUpdate(
                    { _id: fixtureId },
                    { $inc: { 'awayTeam.score': 1 },
                              updatedAt: new Date() },
                    { new: true },
                  );
            return successResponse(res, 200, 'Fixture', {
                    message: 'Score Updated!',
                    id: updateScore.id,
                    homeTeam: updateScore.homeTeam,
                    awayTeam: updateScore.awayTeam,
                    referee: updateScore.referee,
                    happeningOn: updateScore.happeningOn,
                    addedAt: updateScore.addedAt,
                    updatedAt: updateScore.updatedAt
                  });
        } catch (err) {
            console.log(err)
            return serverErrorResponse(err, req, res);
        }
} 
     
static async decrementHomeTeamScore(req, res) {
    const fixtureId = req.params.id;
    try {
        const checkFixture = await Fixture.findOne({ _id: fixtureId});
            if(!checkFixture) {
                return errorResponse(res, 404, { message: 'Fixture not found' });
            }
            const scoreIsZero = await Fixture.findOne({ _id: fixtureId, 'homeTeam.score': { $lt: 1 } })
           if (scoreIsZero) {
                return successResponse(res, 200, 'Fixture', {
                    message: 'Home Team\'s Score cannot be decreased below 0!',
                    id: scoreIsZero.id,
                    homeTeam: scoreIsZero.homeTeam,
                    awayTeam: scoreIsZero.awayTeam,
                    referee: scoreIsZero.referee,
                    happeningOn: scoreIsZero.happeningOn,
                    addedAt: scoreIsZero.addedAt,
                    updatedAt: scoreIsZero.updatedAt
                 });
            }
        const updateScore = await Fixture.findOneAndUpdate(
                { _id: fixtureId },
                { $inc: { 'homeTeam.score': -1 },
                  updatedAt: new Date()  },
                { new: true },
                );
        return successResponse(res, 200, 'Fixture', {
                message: 'Score Updated!',
                id: updateScore.id,
                homeTeam: updateScore.homeTeam,
                awayTeam: updateScore.awayTeam,
                referee: updateScore.referee,
                happeningOn: updateScore.happeningOn,
                addedAt: updateScore.addedAt,
                updatedAt: updateScore.updatedAt
            });
        } catch (err) {
            return serverErrorResponse(err, req, res);
    }
    }
static async decrementAwayTeamScore(req, res) {
    const fixtureId = req.params.id;
        try {
            const checkFixture = await Fixture.findOne({ _id: fixtureId});
            if(!checkFixture) {
                return errorResponse(res, 404, { message: 'Fixture not found' });
            }
            const scoreIsZero = await Fixture.findOne({ _id: fixtureId, 'awayTeam.score': { $lt: 1 } })
            if (scoreIsZero) {
                return successResponse(res, 200, 'Fixture', {
                    message: 'Away Team\'s Score cannot be decreased below 0!',
                    id: scoreIsZero.id,
                    homeTeam: scoreIsZero.homeTeam,
                    awayTeam: scoreIsZero.awayTeam,
                    referee: scoreIsZero.referee,
                    happeningOn: scoreIsZero.happeningOn,
                    addedAt: scoreIsZero.addedAt,
                    updatedAt: scoreIsZero.updatedAt
                });
            }
            const updateScore = await Fixture.findOneAndUpdate(
                    { _id: fixtureId },
                    { $inc: { 'awayTeam.score': -1 },
                          updatedAt: new Date()  },
                     { new: true },
                  );
                return successResponse(res, 200, 'Fixture', {
                    message: 'Score Updated!',
                    id: updateScore.id,
                    homeTeam: updateScore.homeTeam,
                    awayTeam: updateScore.awayTeam,
                    referee: updateScore.referee,
                    happeningOn: updateScore.happeningOn,
                    addedAt: updateScore.addedAt,
                    updatedAt: updateScore.updatedAt
                });
        } catch (err) {
            console.log(err)
            return serverErrorResponse(err, req, res);
            }
    } 
               
           
}
 
export default FixtureController;