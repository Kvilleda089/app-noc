import { LogSeverityLevel } from "../models/enum/log-severity-level";
import { LogModel } from "../models/log.model";



export abstract class LogDataSource {
 
    abstract saveLogs(log: LogModel): Promise<void>;
    abstract getLogs(severityLavel: LogSeverityLevel): Promise<LogModel[]>;
}