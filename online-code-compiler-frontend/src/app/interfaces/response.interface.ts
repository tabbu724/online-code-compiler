export interface IExecuteCodeResponse {
    output: string;
    statusCode: number;
    memory: string;
    cpuTime: string;
    compilationStatus: string | number;
    projectKey: string;
    error: string;
    isExecutionSuccess: boolean;
    isCompiled: boolean;
}