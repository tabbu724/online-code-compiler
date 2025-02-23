export interface ILanguage {
    supportedLanguage: String;
    versionConfig: IVersionConfiguration[];
    languageMode: String;
    isDeleted?: Boolean;
};

export interface IVersionConfiguration {
    // lang: String;
    name: String;
    version: String;
    index: String;
}