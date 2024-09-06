import { CronJob } from 'cron';

type CronTime = string  | Date; 
type OnTick = ()=> void;

export class CronService {
    static CreateJob(cronTime: CronTime, onTick: OnTick): CronJob{
        const cronJob = new CronJob(cronTime, onTick);
        
        cronJob.start();  
        return cronJob;
    }; 
}


