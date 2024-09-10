import { LogSchemaModel } from "../../data/mongoDB/models/log-schema.model";
import { LogDataSource } from "../../domain/Datasources/log.datasource";
import { LogSeverityLevel } from "../../domain/models/enum/log-severity-level";
import { LogModel } from "../../domain/models/log.model";



export class MongoLogDataSource implements LogDataSource {


    async saveLogs(log: LogModel): Promise<void> {
        const newLog = await LogSchemaModel.create(log);
        console.log('Mongo Log Created: ', newLog.id);
    };

    async getLogs(severityLavel: LogSeverityLevel): Promise<LogModel[]> {
        const logs = await LogSchemaModel.find({
            level: severityLavel
        })

        return logs.map(mongoLog => LogModel.fromObject(mongoLog));
    };
}