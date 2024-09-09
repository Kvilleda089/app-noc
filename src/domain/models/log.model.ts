import { LogSeverityLevel } from "./enum/log-severity-level";

export interface LogEntityOptions {
    message: string,
    level: LogSeverityLevel,
    orgin: string
    createAt?: Date;
}
export class LogModel {

    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions){
        this.message = options.message;
        this.level = options.level;
        this.createAt = new Date();
        this.origin = options.orgin;
    }

    static fromJson = (jsonData: string):LogModel=>{
       const {message, level, createAt, origin} = JSON.parse(jsonData);
       
       const log = new LogModel({
        message: message,
        level: level,
        createAt: createAt,
        orgin: origin
       });
       return log;
    } 
};