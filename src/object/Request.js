import Object405 from "./base/ObjectEats"
import SimpleEats from "./base/SimpleEats";

export default class Request extends Object405 {
 
    static TYPE = "Request";

    message = undefined;
    prix = undefined;

    user = new SimpleEats("req_user", this);
}