import { LogSeverityLevel } from "./enum/log-severity-level";

export interface LogEntityOptions {
    message: string,
    level: LogSeverityLevel,
    origin: string
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
        this.origin = options.origin;
    }

    static fromJson = (jsonData: string):LogModel=>{
        jsonData = (jsonData ==='')? '{}': jsonData;
       const {message, level, createAt, origin} = JSON.parse(jsonData);
       
       const log = new LogModel({
        message: message,
        level: level,
        createAt: createAt,
        origin: origin
       });
       return log;
    } 

    static fromObject = (object: {[key: string]: any}): LogModel =>{
        const {message, level, createAt, origin} = object;
        const log = new LogModel({
            message, level, createAt, origin
        });
        return log;
    }
};