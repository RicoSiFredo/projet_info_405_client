class ErrorMessage{
    constructor(error, message){
        this.error = error;
        this.message = message;
    }
};

export default class ErrorModal{
    constructor(){
        this.error_message_list = []
    }
    addErrorMessage(error, message){
        let error_message = new ErrorMessage(error, message);
        this.deleteErrorMessage(error);
        this.error_message_list.push(error_message);
    }
    deleteErrorMessage(error){
        let index = this.error_message_list.findIndex(function(element){
            return element.error == error;
        });
        if(index != -1){
            this.error_message_list.splice(index, 1);
        }
    }
    getMessage(error){
        let error_message = this.error_message_list.find(function(element){
            return element.error == error;
        });
        let res;
        if (error_message!=undefined){
            res = error_message.message;
        }
        else {
            res = error.toString();
        }
        return res;
    }
}