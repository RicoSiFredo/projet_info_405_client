import ObjectEats from "./base/ObjectEats";
import SimpleEats from "./base/SimpleEats";

export default class Notif extends ObjectEats {
    
    static TYPE = "Notif";

    current_type = undefined;
    current_description = undefined;

    by = new SimpleEats("by", this);
    target = new SimpleEats("target", this);
    elem = new SimpleEats("elem", this);
}