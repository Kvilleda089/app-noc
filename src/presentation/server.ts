import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron.service"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/Datasource/file-system.datasource";
import { EmailService } from './email/email.service';
import { sendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDataSource } from "../infrastructure/Datasource/mongo-log.datasource";
import { PostgreLogDatasource } from "../infrastructure/Datasource/postgre-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const PostgreRepository = new LogRepositoryImpl(new PostgreLogDatasource());
const mongoRepository = new LogRepositoryImpl(new MongoLogDataSource());

const emailService = new EmailService();

export class Server {

    public static start() {
        console.log("Server Started...")

        //new sendEmailLogs(emailService, fileSystemLogRepository).execute(['correo@prueba.com'])
       
       CronService.CreateJob(
            '*/20 * * * * *',
            () => {
                const url = 'https://google.cowerqwerqm';
                new CheckServiceMultiple(
                    [fsLogRepository, PostgreRepository, mongoRepository],
                    () => console.log(`${url} is OK`),
                    (error) => console.log(error)
                ).execute(`${url}`)
                
            }
        );
    }
}