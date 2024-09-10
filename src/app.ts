import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugin/envs.plugin";
import { MongoDatabase } from "./data/mongoDB";
import { LogSchemaModel } from "./data/mongoDB/models/log-schema.model";
import { Server } from "./presentation/server";


(async() =>{
   await main();
})();

async function main(){
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });
    Server.start();
}