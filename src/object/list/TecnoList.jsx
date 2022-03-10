import List from "./List";
import TecnoElem from "./TecnoElem";

const TYPE = {
    TECNO: 0
};
function TecnoList({tecnoList}){
    function count(){
        return tecnoList.size();
        // donne le nombre d'élément
    }
    function type(index){
        return TYPE.TECNO;

    }
    function compute(index){
        let typeLay = type(index);
        // on recupère le type de l'élément

        let res;
        
        if(typeLay==TYPE.TECNO){
            res = <TecnoElem tecno={tecnoList.get(index)}>

            </TecnoElem>
        }
        return res;
    }
    function key(index){
        return "tecno-"+index;
        // la clé de chaque élément de la liste
    }
    return <List
        count={count}
        type={type}
        compute={compute}
        generateKey={key}>

    </List>
}
export default TecnoList;