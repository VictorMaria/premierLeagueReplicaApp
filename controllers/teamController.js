import Team from '../models/Team';
import serverResponse from '../modules/serverResponse';
import client from '../helpers/redis';
 
const { successResponse, serverErrorResponse, errorResponse } = serverResponse;
 
class TeamController {
    static async addTeam (req, res) {
        const adminId = req.user.id;
        const { teamName, manager, stadium, website } = req.body;
        try {
            const newTeam = new Team({
                adminId,
                teamName: teamName.toLowerCase(),
                manager,
                stadium,
                website,
            });
        const team = await newTeam.save();
        return successResponse(res, 201, 'Team', {
            message: 'Team Added!',
            id: team.id,
            adminId: team.adminId,
            teamName: team.teamName,
            manager: team.manager,
            stadium: team.stadium,
            website: team.website,
            addedAt: team.addedAt,
          });
        } catch (err) {
            return serverErrorResponse(err, req, res);
        };
    }
    static async getAllTeams (req, res) {
        try {
            const checkTeams = await Team.find();
            client.setex('teamsRedisKey', 2800, JSON.stringify(checkTeams));
                return successResponse(res, 200, 'Teams', checkTeams);
          } catch (err) {
            return serverErrorResponse(err, req, res);
          }
    }

    static async getTeam (req, res) {
        const teamId = req.params.id;
        try {
            const checkTeam = await Team.findOne({
                _id: teamId
            })
            if (!checkTeam) {
                return errorResponse(res, 404, { message: 'Team not found' });
            }
        return successResponse(res, 200, 'Team', {
            message: 'Here you go!',
            id: checkTeam.id,
            adminId: checkTeam.adminId,
            teamName: checkTeam.teamName,
            manager: checkTeam.manager,
            stadium: checkTeam.stadium,
            website: checkTeam.website,
            addedAt: checkTeam.addedAt,
          });
        } catch (err) {
            return serverErrorResponse(err, req, res);
        };
    }
};

export default TeamController;