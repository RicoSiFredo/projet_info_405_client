import CompareEats from "./base/CompareEats";
import ObjectEats from "./base/ObjectEats";
import SimpleEats from "./base/SimpleEats";

export default class Action extends ObjectEats {

    static TYPE = "Action";

    date = undefined;

    project = new SimpleEats("act", this, CompareEats.compareInt("date", CompareEats.DESC));

}