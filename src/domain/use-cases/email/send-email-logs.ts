import { EmailService } from "../../../presentation/email/email.service";
import { LogSeverityLevel } from "../../models/enum/log-severity-level";
import { LogModel } from "../../models/log.model";
import { LogRepository } from "../../repository/log.repository";


interface SendEmailLogUseCase{

    execute: (to: string | string[]) => Promise<Boolean>
};


export class sendEmailLogs implements SendEmailLogUseCase{

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){

    }
    async execute(to: string | string[]){

        try {
           const send = await this.emailService.sendEmailWithFileSystemLogs(to);
            if(!send){
                throw new Error('Email log not send');
            }
            const log = new LogModel({
                message: `Send email success!`,
                level: LogSeverityLevel.low,
                orgin: 'send-email-logs'
            });
            this.logRepository.saveLogs(log)
            return true;
        } catch (error) {
            const log = new LogModel({
                message: `${error}`,
                level: LogSeverityLevel.high,
                orgin: 'send-email-logs'
            });
            this.logRepository.saveLogs(log)
            return false;
        } 
    }
}
