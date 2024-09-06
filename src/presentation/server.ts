import { error } from "console";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./plugin/cron-service"



export class Server {

    public static start(){
        console.log("Server Started...")
        CronService.CreateJob(
            '*/5 * * * * *',
            ()=>{
            const url = 'https://google.com';
            new CheckService(
                () => console.log(`${url} is OK`),
                (error) => console.log(error)
            ).execute(`${url}`)
            //new CheckService().execute('http://localhost:3000/posts');
            }
        );
    }
}