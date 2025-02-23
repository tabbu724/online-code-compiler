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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLanguage = exports.addLanguagesToDb = exports.getSupportedLanguages = exports.executeCode = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const language_1 = require("../models/language");
const dbController_1 = require("./dbController");
const collectionName = 'languages';
const executeCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('123 here---->>>>>');
    const reqBody = req.body;
    const payload = {
        script: reqBody.program,
        language: reqBody.language,
        versionIndex: reqBody.version,
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET
    };
    console.log('payload', payload, typeof payload);
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        };
        console.log('options', options);
        const response = yield (0, node_fetch_1.default)(process.env.JDOODLE_ENDPOINT, options);
        const data = yield response.json();
        console.log('fetch res', data);
        res.setHeader('Access-control-allow-origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.status(200).send({
            result: data
        });
    }
    catch (error) {
        console.log('error', error);
    }
});
exports.executeCode = executeCode;
const getSupportedLanguages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let availableLanguages = yield (0, dbController_1.fetchAllData)(collectionName, { isDeleted: { $ne: true } });
    if (!availableLanguages.length) {
        res.status(404).send({
            errMessage: 'No languages are configured'
        });
    }
    availableLanguages.forEach((lang) => {
        delete lang._id;
        delete lang.__v;
    });
    res.setHeader('Access-control-allow-origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).send({
        data: availableLanguages,
    });
});
exports.getSupportedLanguages = getSupportedLanguages;
const addLanguagesToDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const languageList = req.body;
    let hasInvalidBody;
    if (!languageList || !languageList.length) {
        hasInvalidBody = true;
    }
    // else {
    //     hasInvalidBody = languageList.some((language) => {
    //         return !language?.supportedLanguage?.length || !language?.versionConfig || !language.versionConfig.some((versionDetail) => {return !(versionDetail?.index || versionDetail?.name || versionDetail?.version)})
    //     })
    // }
    if (hasInvalidBody) {
        // throw new Error('request body is incorrect')
        res.status(500).send({ errMessage: 'request body is incorrect' });
    }
    const existingLanguages = yield (0, dbController_1.fetchData)(collectionName, { supportedLanguage: { $in: languageList.map((lang) => lang.supportedLanguage) }, isDeleted: { $ne: true } });
    if (existingLanguages) {
        return res.status(400).send({ data: `These languages already exist.` });
    }
    const languageDocList = [];
    for (const languageDetail of languageList) {
        const languageDoc = new language_1.language(languageDetail);
        languageDocList.push(languageDoc);
    }
    const response = yield language_1.language.bulkSave(languageDocList);
    if (response) {
        res.setHeader('Access-control-allow-origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.status(200).send({ data: `${response.insertedCount} language details added to db` });
    }
});
exports.addLanguagesToDb = addLanguagesToDb;
const updateLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputLanguage = req.body;
    const existingLanguage = yield (0, dbController_1.fetchData)(collectionName, { supportedLanguage: inputLanguage.supportedLanguage, isDeleted: { $ne: true } });
    if (!existingLanguage) {
        return res.status(404).send({ data: `This language does not exist. So cannot be updated` });
    }
    const updatedDoc = {};
    if ('isDeleted' in inputLanguage) {
        updatedDoc.isDeleted = inputLanguage.isDeleted;
    }
    if ('versionConfig' in inputLanguage) {
        updatedDoc.versionConfig = inputLanguage.versionConfig;
    }
    if ('languageMode' in inputLanguage) {
        updatedDoc.languageMode = inputLanguage.languageMode;
    }
    console.log('existing lang', existingLanguage);
    const updateRes = yield (0, dbController_1.updateData)(collectionName, { _id: existingLanguage._id }, { $set: updatedDoc });
    if (updateRes) {
        res.setHeader('Access-control-allow-origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        return res.status(200).send({ data: `language updated`, msg: updateRes });
    }
});
exports.updateLanguage = updateLanguage;
//# sourceMappingURL=executionController.js.map