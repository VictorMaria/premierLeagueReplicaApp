const mockFixtures = {
    missingHomeTeam: {
        awayTeam: 'Pandora FC',
        stadium: 'Kano Pillars Stadium',
        happeningOn: '2019-12-13T12:30',
        referee: 'Kunle Amhed',
        city: 'Kano',
        country: 'Nigeria',
        idempotencyKey: '0ecdb24b-398b-473e-a535-2b18412844ba',
    },
    missingAwayTeam: {
        homeTeam: 'Kano Pillars',
        stadium: 'Kano Pillars Stadium',
        happeningOn: '2019-12-13T12:30',
        referee: 'Kunle Amhed',
        city: 'Kano',
        country: 'Nigeria',
        idempotencyKey: '0ecdb24b-398b-473e-a535-2b18412844ba',
    },
    missingStadium: {
        homeTeam: 'Kano Pillars',
        awayTeam: 'Pandora FC',
        happeningOn: '2019-12-13T12:30',
        referee: 'Kunle Amhed',
        city: 'Kano',
        country: 'Nigeria',
        idempotencyKey: '0ecdb24b-398b-473e-a535-2b18412844ba',
    },
    missingHappeningOn: {
        homeTeam: 'Kano Pillars',
        awayTeam: 'Pandora FC',
        stadium: 'Kano Pillars Stadium',
        referee: 'Kunle Amhed',
        city: 'Kano',
        country: 'Nigeria',
        idempotencyKey: '0ecdb24b-398b-473e-a535-2b18412844ba',
    },
    missingReferee: {
        homeTeam: 'Kano Pillars',
        awayTeam: 'Pandora FC',
        stadium: 'Kano Pillars Stadium',
        happeningOn: '2019-12-13T12:30',
        city: 'Kano',
        country: 'Nigeria',
        idempotencyKey: '0ecdb24b-398b-473e-a535-2b18412844ba',
    },
    missingCity: {
        homeTeam: 'Kano Pillars',
        awayTeam: 'Pandora FC',
        stadium: 'Kano Pillars Stadium',
        happeningOn: '2019-12-13T12:30',
        referee: 'Kunle Amhed',
        country: 'Nigeria',
        idempotencyKey: '0ecdb24b-398b-473e-a535-2b18412844ba',
    },
    missingCountry: {
        homeTeam: 'Kano Pillars',
        awayTeam: 'Pandora FC',
        stadium: 'Kano Pillars Stadium',
        happeningOn: '2019-12-13T12:30',
        referee: 'Kunle Amhed',
        city: 'Kano',
        idempotencyKey: '0ecdb24b-398b-473e-a535-2b18412844ba',
    },
    invalidDateTime: {
        homeTeam: 'Kano Pillars',
        awayTeam: 'Pandora FC',
        stadium: 'Kano Pillars Stadium',
        happeningOn: '2019-12-1312:30',
        referee: 'Kunle Amhed',
        city: 'Kano',
        country: 'Nigeria',
        idempotencyKey: '0ecdb24b-398b-473e-a535-2b18412844ba',
    },
    sameTeams: {
        homeTeam: 'Kano Pillars',
        awayTeam: 'Kano Pillars',
        stadium: 'Kano Pillars Stadium',
        happeningOn: '2019-12-13T12:30',
        referee: 'Kunle Amhed',
        city: 'Kano',
        country: 'Nigeria',
        idempotencyKey: '0ecdb24b-398b-473e-a535-2b18412844ba',
    },
    firstFixture: {
        homeTeam: 'Kano Pillars',
        awayTeam: 'Pandora FC',
        stadium: 'Kano Pillars Stadium',
        happeningOn: '2019-12-13T12:30',
        referee: 'Kunle Amhed',
        city: 'Kano',
        country: 'Nigeria',
        idempotencyKey: '0ecdb24b-398b-473e-a535-2b18412844ba',
    },
    secondFixture: {
        homeTeam: 'Kiwi FC',
        awayTeam: 'Sharks',
        stadium: 'Kiwi Arena',
        happeningOn: '2020-12-14T12:30',
        referee: 'Sambo',
        city: 'Kiwi City',
        country: 'Kiwi Land',
        idempotencyKey: '91a21771-2c7b-4162-85dd-5f1a7a509da1',
    },
    thirdFixture: {
        homeTeam: 'Pandora FC',
        awayTeam: 'Kano Pillars',
        stadium: 'Pandora Stadium',
        happeningOn: '2021-01-13T12:30',
        referee: 'Segun Amhed',
        city: 'Abuja',
        country: 'Nigeria',
        idempotencyKey: '381295a1-dd7b-467c-936a-d2c502055273',
    },
    fixtureToEdit: {
        homeTeam: 'Panda FC',
        awayTeam: 'Kano Pillars',
        stadium: 'Panda Stadium',
        happeningOn: '2021-01-13T12:30',
        referee: 'Segun Amhed',
        city: 'Abuja',
        country: 'Nigeria',
    },
    finalFixture: {
        homeTeam: 'Owls FC',
        awayTeam: 'Crows FC',
        stadium: 'Owl City',
        happeningOn: '2020-02-04T12:30',
        referee: 'Robinson',
        city: 'Abuja',
        country: 'Nigeria', 
        idempotencyKey: '31002f4c-3508-428a-90af-810fa7c71176',
    },
    invalidIdempotencyKey: {
        homeTeam: 'Ravens FC',
        awayTeam: 'Crows FC',
        stadium: 'Nest Raven',
        happeningOn: '2020-02-04T12:30',
        referee: 'Robinson',
        city: 'Abuja',
        country: 'Nigeria',
        idempotencyKey: 'dd2082f5-2809-4268-a54f-e4a811c0760',
    },
    missingIdempotencyKey: {
        homeTeam: 'Ravens FC',
        awayTeam: 'Crows FC',
        stadium: 'Nest Raven',
        happeningOn: '2020-02-04T12:30',
        referee: 'Robinson',
        city: 'Abuja',
        country: 'Nigeria', 
    },
    oneOtherFixture: {
        homeTeam: 'Ravens FC',
        awayTeam: 'Crows FC',
        stadium: 'Nest Raven',
        happeningOn: '2020-02-04T12:30',
        referee: 'Robinson',
        city: 'Abuja',
        country: 'Nigeria', 
        idempotencyKey: 'dd2082f5-2809-4268-a54f-e4a811c07601',
    },
    fixtureToDelete: {
        homeTeam: 'Ravens FC',
        awayTeam: 'Crows FC',
        stadium: 'Nest Raven',
        happeningOn: '2019-02-04T12:30',
        referee: 'Robinson',
        city: 'Abuja',
        country: 'Nigeria', 
        idempotencyKey: 'dd2082f5-2801-4268-a54f-e4a811c07601',
    },
};

export default mockFixtures;