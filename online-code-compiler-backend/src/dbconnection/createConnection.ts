import { Db } from "mongodb";
import { connect } from "mongoose";


export const createDbConnection = async () => {
    try {
        const dbConnection = await connect(process.env.MONGODB_CONNECTION_STRING, {dbName: 'online-code-compiler'});
        if (dbConnection) {
            dbInstance = dbConnection.connection.db;
            console.log('Db connection successfull');
        }
        else {
            console.error('unable to connect to db');
            
        }
    } catch (error) {
        console.error('Error connecting to db');
        throw(error);
    }
};
export let dbInstance: Db;
