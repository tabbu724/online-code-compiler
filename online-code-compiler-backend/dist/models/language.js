"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.language = void 0;
const mongoose_1 = require("mongoose");
const versionConfigSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    index: { type: String, required: true },
    version: { type: String, required: true },
}, { _id: false });
const languageSchema = new mongoose_1.Schema({
    supportedLanguage: { type: String, required: true },
    versionConfig: [versionConfigSchema],
    isDeleted: { type: Boolean, required: false },
    languageMode: { type: String, required: true }
});
exports.language = (0, mongoose_1.model)('language', languageSchema);
//# sourceMappingURL=language.js.map