import dotenv from 'dotenv';
import Fixture from '../models/Fixture';
import serverResponse from '../modules/serverResponse';

dotenv.config();

const { host } = process.env;

const { errorResponse, successResponse } = serverResponse;

const fixtureLinkRedirect = async (req, res) => {
    const linkId = req.params.id;
    const fixtureLink = `${host}/${linkId}`;
    const checkFixture = await Fixture.findOne({ fixtureLink });
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
        });
};

export default fixtureLinkRedirect;