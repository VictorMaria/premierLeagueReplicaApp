import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const { REDISCLOUD_URL, REDISCLOUD_URL_TEST } = process.env;

const selectUrl = () => {
    if(process.env.NODE_ENV === 'test'){
        return REDISCLOUD_URL_TEST
    } else {
        return REDISCLOUD_URL
    }
}

const url = selectUrl();

const client = redis.createClient(url);


 
client.on('error', (err) => {
    console.log(`Error ${err}`)
});
 
export default client;