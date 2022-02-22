export default class Response{
    static isSuccessResponse(response){
        return response["status"]=="success";
    }
    static error(response){
        return response["error"];
    }
}