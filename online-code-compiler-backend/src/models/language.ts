import { Schema, model } from "mongoose";
import { ILanguage, IVersionConfiguration } from "interfaces/languageInterface";


const versionConfigSchema =  new Schema<IVersionConfiguration>({
    name: {type: String, required: true},
    index: {type: String, required: true},
    version: {type: String, required: true},
}, {_id: false})

const languageSchema = new Schema<ILanguage>({
    supportedLanguage: {type: String, required: true},
    versionConfig: [versionConfigSchema],
    isDeleted: {type: Boolean, required: false},
    languageMode: {type: String, required: true}
})

export const language = model<ILanguage>('language', languageSchema)
