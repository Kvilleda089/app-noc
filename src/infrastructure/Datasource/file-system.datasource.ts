import fs from 'fs'
import { LogDataSource } from "../../domain/Datasources/log.datasource";
import { LogSeverityLevel } from '../../domain/models/enum/log-severity-level';
import { LogModel } from '../../domain/models/log.model';



export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';


    constructor(){
        this.createLogsFile();
    }

    private createLogsFile = () =>{
      if(!fs.existsSync(this.logPath)){
        fs.mkdirSync(this.logPath);
      };

      [
        this.allLogsPath, 
        this.mediumLogsPath,
        this.highLogsPath,
      ].forEach(path =>{
        if(fs.existsSync(path)) return;
        fs.writeFileSync(path, '');
      });
    };

    private getLogsFromFile = (path: string): LogModel[] =>{
        const content = fs.readFileSync(path, 'utf-8');
        if(content ==='') return [];
        const logs = content.split('\n').map(log =>LogModel.fromJson(log));
        return logs;
    }

    async saveLogs(newLog: LogModel): Promise<void> {

        const LogAsJson = `${JSON.stringify(newLog)}\n`;
        fs.appendFileSync(this.allLogsPath, LogAsJson);
        if (newLog.level === LogSeverityLevel.low) return;

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, LogAsJson);
        } else {
            fs.appendFileSync(this.highLogsPath, LogAsJson);
        }
    };


   async getLogs(severityLavel: LogSeverityLevel): Promise<LogModel[]> {
        
        switch(severityLavel){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${severityLavel} not implemented`)
        }
    }

}