import { LogDataSource } from "../../domain/Datasources/log.datasource";
import { LogSeverityLevel } from "../../domain/models/enum/log-severity-level";
import { LogModel } from "../../domain/models/log.model";
import { LogRepository } from "../../domain/repository/log.repository";



export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly logDataSource: LogDataSource,
    ){

    }
   async saveLogs(log: LogModel): Promise<void> {
       this.logDataSource.saveLogs(log);
    }
    async getLogs(severityLavel: LogSeverityLevel): Promise<LogModel[]> {
      return this.logDataSource.getLogs(severityLavel);
    }

}