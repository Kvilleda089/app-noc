import { LogSeverityLevel } from "./enum/log-severity-level";


export class LogModel {

    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;

    constructor(message: string, level: LogSeverityLevel){
        this.message = message;
        this.level = level;
        this.createAt = new Date();
    }

    static fromJson = (jsonData: string):LogModel=>{
       const {message, level, createAt} = JSON.parse(jsonData);
       
       const log = new LogModel(message, level);
       log.createAt = new Date(createAt);
       return log;
    } 
};