import axios from 'axios';
import redis from 'redis';
import dotenv from 'dotenv';
import { promisify } from 'util'
import { JobInterface } from '../interfaces/job';


dotenv.config();


const client = redis.createClient();
const getAsync = promisify(client.get).bind(client)

export async function fetchGitHub(): Promise<JobInterface[]> {

    let resultCount = 1;
    let onPage = 0;

    const allJobs = [] as JobInterface[];

    while (resultCount > 0) {
        const res = await axios.get(process.env.GITHUB_JOBS_URL,
            {
                params: {
                    page: onPage
                }
            }
        );

        const jobs = res.data;
        allJobs.push(...jobs)
        resultCount = jobs.length;

        console.log('consegui', resultCount, 'vagas')
        onPage = onPage + 1;
    }

    return allJobs;

}
