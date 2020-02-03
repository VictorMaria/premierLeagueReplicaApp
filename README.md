# Premier League Replica App

This is a replica of the Premier League App: Get team and fixture info.

Premier League 360 is a replica app hosted on [Premier League Replica App](https://plrapp.herokuapp.com/)

### Technologies Used
1. Node/Express
2. Cloud Mongo DB
3. Redis and Redis Cloud
4. Docker
5. Jest (for testing)
6. Heroku
7. POSTMAN

```
# Clone Develop Branch
git clone https://github.com/VictorMaria/premierLeagueReplicaApp.git

# Navigate into the newly created folder
cd premierLeagueReplicaApp

# Run Install dependences
npm run install

# Before testing, refresh the database and cache
npm run refreshDb

# Then test
npm test

# Start Server
npm start

```


Tokens generated from user sign up/user sign in and admin sign up/admin sign in are used to access user and admin routes respectively.

The search route does not require a token.

Examples of each request can be found by clicking 'Examples' at the top right corner of POSTMAN window. 

#### Users can
1. Sign up  ****POST /api/v1/auth/signup****
2. Sign in  ****POST /api/v1/auth/signin****
3. View a team ****GET /api/v1/teams/{id}****
4. View all teams ****GET /api/v1/teams****
5. View a fixture ****GET /api/v1/fixtures/{id}****
6. View Pending fixtures ****GET /api/v1/fixtures/pending****
7. View Completed fixtures ****GET /api/v1/fixtures/completed****
8. Search for teams and their respective fixtures ****GET /api/v1/teams/search?keyword=teamname****

#### Admins can
1. Sign up ****POST /api/v1/admin/signup****
2. Sign in ****POST /api/v1/admin/signin****
3. Add a team ****POST /api/v1/teams****
4. Edit a team ****PATCH /api/v1/teams/{id}****
5. View a team ****GET /api/v1/teams/{id}****
6. Delete a team ****DELETE /api/v1/teams/{id}****
7. Add a fixture ****POST /api/v1/fixtures****
8. Generate unique fixture link ****PATCH /api/v1/fixture/{id}/link****
9. View a fixture with  extra details ****GET /api/v1/fixtures/{id}/admin****
10. Edit a fixture ****PATCH /api/v1/fixtures/{id}****
11. Delete a fixture ****DELETE /api/v1/fixtures/{id}****
12. Increment home team's score for a fixture by one ****PATCH /api/v1/fixtures/{id}/hometeam/inc****
13. Increment away team's score for a fixture by one ****PATCH /api/v1/fixtures/{id}/awayteam/inc****
14. Decrement home team's score for a fixture by one ****PATCH /api/v1/fixtures/{id}/hometeam/dcr****
15. Decrement away team's score for a fixture by one ****PATCH /api/v1/fixtures/{id}/awayteam/dcr****

Both users and admins can accesss ****/{id}**** to fetch a fixture through a unique fixture link, access to this route also requires a token.


Read more about [Idempotency](https://stripe.com/blog/idempotency) here.
