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
           
}
 
export default FixtureController;