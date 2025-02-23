import { Request, Response } from "express";
import { ExecuteCodeRequestBody } from "../types/requestTypes"
import fetch from 'node-fetch'
import { ILanguage } from "../interfaces/languageInterface";
import { language } from "../models/language";
import mongoose, { Document, ObjectId } from "mongoose";
import { fetchAllData, fetchData, updateData } from "./dbController";
const collectionName = 'languages'

export const executeCode = async (req: Request, res: Response) => {
    console.log('123 here---->>>>>');
    
    const reqBody = req.body as ExecuteCodeRequestBody;
    const payload = {
        script : reqBody.program,
        language: reqBody.language,
        versionIndex: reqBody.version,
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET
    }
    console.log('payload',payload, typeof payload);
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'}
        };
        console.log('options', options);
        
        const response = await fetch(process.env.JDOODLE_ENDPOINT, options);
        
        const data = await response.json()
        console.log('fetch res', data);
        res.setHeader('Access-control-allow-origin', '*')
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.status(200).send({
            result : data
        })
    } catch (error) {
        console.log('error', error);
        
    }
}

export const getSupportedLanguages = async (req: Request,res: Response) => {

    let availableLanguages = await fetchAllData(collectionName, {isDeleted: {$ne: true}}) as unknown as Document<ILanguage>[];
    if (!availableLanguages.length) {
        res.status(404).send({
            errMessage: 'No languages are configured'
        })
    }
    availableLanguages.forEach((lang) => {
        delete lang._id
        delete lang.__v
    })
    res.setHeader('Access-control-allow-origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    
    res.status(200).send({
        data: availableLanguages,
    })

}

export const addLanguagesToDb = async (req: Request, res: Response) => {
    const languageList = req.body as ILanguage[]
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
        res.status(500).send({errMessage: 'request body is incorrect'})
    }
    const existingLanguages = await fetchData(collectionName, { supportedLanguage: {$in: languageList.map((lang) =>  lang.supportedLanguage)}, isDeleted: {$ne: true}}) as unknown as Document<ILanguage>;
    if (existingLanguages) {
        return res.status(400).send({data: `These languages already exist.`})
        
    }
    const languageDocList: Document[] = [];
    for (const languageDetail of languageList) {
        const languageDoc = new language(languageDetail);
        languageDocList.push(languageDoc)
    }
    const response = await language.bulkSave(languageDocList);
    if (response) {
        res.setHeader('Access-control-allow-origin', '*')
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.status(200).send({data: `${response.insertedCount} language details added to db`})
        
    }
    
}

export const updateLanguage = async (req: Request, res: Response) => {
    const inputLanguage = req.body as ILanguage;
    const existingLanguage = await fetchData(collectionName, { supportedLanguage: inputLanguage.supportedLanguage, isDeleted: {$ne: true}}) as unknown as Document<ILanguage>;
    if (!existingLanguage) {
        return res.status(404).send({data: `This language does not exist. So cannot be updated`})
        
    }
    const updatedDoc: Partial<ILanguage> = {}

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
    const updateRes = await updateData(collectionName, {_id: existingLanguage._id}, {$set: updatedDoc})
    if (updateRes) {
        res.setHeader('Access-control-allow-origin', '*')
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        return res.status(200).send({data: `language updated`, msg: updateRes})
    }
    
}

