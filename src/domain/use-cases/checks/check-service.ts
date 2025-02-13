import { LogSeverityLevel } from '../../models/enum/log-severity-level';
import { LogModel } from '../../models/log.model';
import { LogRepository } from '../../repository/log.repository';



interface CheckServiceUseCase{
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){}

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
            this.logRepository.saveLogs(log);
            this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${url} is not OK ${error}`;
            const log = new LogModel({
                message: errorMessage, 
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLogs(log);
            this.errorCallback(`${errorMessage}`);
            return false;
        }

    }
}