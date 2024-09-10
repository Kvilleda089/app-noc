import { LogSeverityLevel } from '../../models/enum/log-severity-level';
import { LogModel } from '../../models/log.model';
import { LogRepository } from '../../repository/log.repository';



interface CheckServiceMultipleUseCase{
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){}

    private callLogs (log: LogModel){
        this.logRepository.forEach(logRepository =>{
            logRepository.saveLogs(log);
        });
    };
    

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogModel({
                message:`Service ${url} working`,
                level: LogSeverityLevel.low, 
                origin: 'check-service.ts'
            })
            this.callLogs(log);
            this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${url} is not OK ${error}`;
            const log = new LogModel({
                message: errorMessage, 
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            });
            this.callLogs(log);
            this.errorCallback(`${errorMessage}`);
            return false;
        }

    }
}