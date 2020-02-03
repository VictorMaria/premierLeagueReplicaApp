const mockTeams = {
    missingTeamName: {
        manager: 'Adamu',
        stadium: 'kano360',
        website: 'www.kanop.com'
    },
    missingManager: {
        teamName: 'Kano Pillars',
        stadium: 'kano360',
        website: 'www.kanop.com' 
    },
    missingStadium: {
        teamName: 'Kano Pillars',
        manager: 'Adamu',
        website: 'www.kanop.com'
    },
    missingWebsite: {
        teamName: 'Kano Pillars',
        manager: 'Adamu',
        stadium: 'kano360', 
    },
    completeTeamDetails: {
        teamName: 'Kano Pillars',
        manager: 'Adamu',
        stadium: 'kano360',
        website: 'www.kanop.com'
    },
    secondCompleteTeamDetails: {
        teamName: 'Kiwi FC',
        manager: 'Smith',
        stadium: 'kiwi stadium',
        website: 'www.kiwistadium.com'
    },
    thirdCompleteTeamDetails: {
        teamName: 'Panda FC',
        manager: 'Joe',
        stadium: 'Panda stadium',
        website: 'www.pandastadium.com'
    },
    teamToEdit: {
        teamName: 'Pandora FC',
        manager: 'Joel',
        stadium: 'Pandora stadium',
        website: 'www.pandorastadium.com'
    },
    teamToDelete: {
        teamName: 'Pan FC',
        manager: 'Joel',
        stadium: 'Pan stadium',
        website: 'www.pandorastadium.com'
    },
};

export default mockTeams;