"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = exports.fetchAllData = exports.fetchData = void 0;
const createConnection_1 = require("../dbconnection/createConnection");
const fetchData = (collectionName, filterExpression) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('collection-->', collectionName);
        console.log('filetrexp-->', filterExpression);
        const data = yield createConnection_1.dbInstance.collection(collectionName).findOne(filterExpression);
        if (data) {
            return data;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.fetchData = fetchData;
const fetchAllData = (collectionName, filterExpression) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('collection-->', collectionName);
        console.log('filetrexp-->', filterExpression);
        const data = yield createConnection_1.dbInstance.collection(collectionName).find(filterExpression).toArray();
        if (data) {
            return data;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.fetchAllData = fetchAllData;
const updateData = (collectionName, updateCriteria, updateExpression) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('updateexp-->', updateExpression);
        console.log('updateCriteria-->', updateCriteria);
        const data = yield createConnection_1.dbInstance.collection(collectionName).updateOne(updateCriteria, updateExpression);
        if (data) {
            return data;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.updateData = updateData;
//# sourceMappingURL=dbController.js.map