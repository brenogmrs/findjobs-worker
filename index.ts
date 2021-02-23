import { CronJob } from 'cron';
import { fetchGitHub } from './tasks/fetch-github';

new CronJob('* * * * *', () => { fetchGitHub() }, null, true, 'America/Sao_Paulo')