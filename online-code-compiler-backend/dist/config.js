"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const result = dotenv_1.default.config();
if (result.error) {
    throw result.error;
}
const { parsed: envs } = result;
exports.envs = envs;
console.log('env variables from .env file--> ', envs);
//# sourceMappingURL=config.js.map