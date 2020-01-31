import Team from '../models/Team';
 
const checkTeam = async (req, res, next) => {
  const teamName = (req.body.teamName).toLowerCase();
  try {
    const doesTeamExist = await Team.findOne({ teamName });
    if (doesTeamExist) {
      return res.status(400).json({ errors: { message: 'This Team already exists' } });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      errors: {
        message:
            'Premier League 360 just experienced a little Shock',
      },
    });
  }
};
 
export default checkTeam;