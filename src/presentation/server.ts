import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./plugin/cron-service"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/Datasource/file-system.datasource";


const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDataSource());


export class Server {

    public static start(){
        console.log("Server Started...")
        CronService.CreateJob(
            '*/5 * * * * *',
            ()=>{
            const url = 'http://localhost:3000/posts';
            new CheckService(
                fileSystemLogRepository,
                () => console.log(`${url} is OK`),
                (error) => console.log(error)
            ).execute(`${url}`)
            //new CheckService().execute('http://localhost:3000/posts');
            }
        );
    }
}