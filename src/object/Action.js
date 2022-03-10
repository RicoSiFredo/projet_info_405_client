import CompareEats from "./base/CompareEats";
import ObjectEats from "./base/ObjectEats";
import SimpleEats from "./base/SimpleEats";

export default class Action extends ObjectEats {

    static TYPE = "Action";

    date = undefined;
    type = undefined;
    root = undefined;
    description = undefined;

    project = new SimpleEats("act", this);
    user = new SimpleEats("do", this);
    role = new SimpleEats("got_role", this);

}