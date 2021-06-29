export default interface IResponse {
    message: string;
    error?: any;
    data?: any;
    status: number;
}
