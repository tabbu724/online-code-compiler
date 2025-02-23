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
exports.createDbConnection = exports.dbInstance = void 0;
const mongoose_1 = require("mongoose");
const createDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConnection = yield (0, mongoose_1.connect)(process.env.MONGODB_CONNECTION_STRING, { dbName: 'online-code-compiler' });
        if (dbConnection) {
            exports.dbInstance = dbConnection.connection.db;
            console.log('Db connection successfull');
        }
    }
    catch (error) {
        console.log('Error connecting to db');
        throw (error);
    }
});
exports.createDbConnection = createDbConnection;
//# sourceMappingURL=connection.js.map