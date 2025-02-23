import { dbInstance } from "../dbconnection/createConnection";

export const fetchData = async (collectionName: string, filterExpression: Object) => {
    try {
        console.log('collection-->', collectionName);
        console.log('filetrexp-->', filterExpression);
        
        const data = await dbInstance.collection(collectionName).findOne(filterExpression);
        if (data) {
            return data;
        }
    } catch (error) {
        throw error;
    }
}

export const fetchAllData = async (collectionName: string, filterExpression: Object) => {
    try {
        console.log('collection-->', collectionName);
        console.log('filetrexp-->', filterExpression);
        
        const data = await dbInstance.collection(collectionName).find(filterExpression).toArray();
        if (data) {
            return data;
        }
    } catch (error) {
        throw error;
    }
}

export const updateData = async (collectionName: string, updateCriteria: Object, updateExpression: Object) => {
    try {
        console.log('updateexp-->', updateExpression);
        console.log('updateCriteria-->', updateCriteria);
        
        const data = await dbInstance.collection(collectionName).updateOne(updateCriteria, updateExpression);
        if (data) {
            return data;
        }
    } catch (error) {
        throw error;
    }
}