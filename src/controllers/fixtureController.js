import Fixture from '../models/Fixture';
import moment from 'moment';
import serverResponse from '../modules/serverResponse';
 
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
           
}
 
export default FixtureController;