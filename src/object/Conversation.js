import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ForeignEats from "./base/ForeignEats";
import ListEats from "./base/ListEats";
import ObjectEats from "./base/ObjectEats";
import List from "./list/List";

export default class Conversation extends ObjectEats {

    static TYPE = "Conversation";

    senderId = undefined;
    receiverId = undefined
}