
import CompareEats from "./base/CompareEats";
import ListEats from "./base/ListEats";
import Object405 from "./base/ObjectEats";
import CvElem from "./CvElem";
export default class History extends CvElem {
    static TYPE = "History";
    name = undefined;
    descriptionProject = undefined;
    role = undefined;
    description = undefined;
    price = undefined;
    heure = undefined;
    start = undefined;
    end = undefined;
    date = undefined;
    compList = new ListEats("for_comp", this, CompareEats.compareInt("date", CompareEats.DESC))
    constructor() {
        super();
    }
}