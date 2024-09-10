import { LogDataSource } from "../../domain/Datasources/log.datasource";
import { LogSeverityLevel } from "../../domain/models/enum/log-severity-level";
import { LogModel } from "../../domain/models/log.model";
import { PrismaClient, SeverityLevel } from '@prisma/client';

const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    high: SeverityLevel.HIGH,
    medium:SeverityLevel.MEDIUM
}

export class PostgreLogDatasource implements LogDataSource{


    async saveLogs(log: LogModel): Promise<void> {
        const level = severityEnum[log.level];
        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level
            }
        });
        console.log("Postgres saved")
    }
    async getLogs(severityLavel: LogSeverityLevel): Promise<LogModel[]> {
        const level = severityEnum[severityLavel];
        const logs = await prismaClient.logModel.findMany({
            where:{level}
        });
        return logs.map(LogModel.fromObject);
    }

}