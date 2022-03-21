import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ForeignEats from "./base/ForeignEats";
import ListEats from "./base/ListEats";
import ObjectEats from "./base/ObjectEats";
import List from "./list/List";

export default class Message extends ObjectEats {

    static TYPE = "Message";

    conversationID = undefined;
    sender = undefined;
    text = undefined;
}