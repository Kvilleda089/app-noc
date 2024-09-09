import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron.service"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/Datasource/file-system.datasource";
import { EmailService } from './email/email.service';
import { sendEmailLogs } from "../domain/use-cases/email/send-email-logs";


const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const emailService = new EmailService();

export class Server {

    public static start() {
        console.log("Server Started...")

        //new sendEmailLogs(emailService, fileSystemLogRepository).execute(['correo@prueba.com'])
       
        CronService.CreateJob(
            '* * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is OK`),
                    (error) => console.log(error)
                ).execute(`${url}`)
                
            }
        );
    }
}