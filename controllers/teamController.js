import Team from '../models/Team';
import serverResponse from '../modules/serverResponse';
 
const { successResponse, serverErrorResponse } = serverResponse;
 
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
};

export default TeamController;