import React from "react";
function LinearCompList({refList, compList}){
    function inRef(comp){
        let found = false;
        let i = 0;
        while(refList!=[]&&refList!=undefined&&!found && i < refList.size()){
            if (refList.get(i).id_str == comp.id_str){
                found = true;
                
            }
            i++;
        }
        return found;
    }
    function getScore(comp){
        if(refList==[]||refList==undefined){
            return 0;
        }
        else {
            if(inRef(comp)){
                return 1;
            }
            else {
                return 0;   
            }
        }
    }
    function getBackground(comp){
        let res;
        if (inRef(comp)){
            res = "bg-success";
        }
        else {
            res = "bg-primary";
        }
        return res;
    }
    let list = []
    if(!(refList==[]||refList==undefined)){
        for (let i = 0; i < compList.size(); i++){
            let comp = compList.get(i);
            list.push(comp)
        }
        list.sort(function(a,b){
            if(getScore(a)>getScore(b)){
                return -1
            }
            else if(getScore(a)<getScore(b)){
                return 1
            }
            else {
                return 0
            }
        });
    }
    return <div className="d-flex flex-wrap">
        {list.map((comp, index) => 
            <div 
                key={comp.id_str} 
                className={"round-50p d-inline ps-2 pe-2 pt-1 pb-1 "+getBackground(comp)+" mt-1 mb-1 me-2 text-white"}>
                {comp.name}
            </div>
        )}
    </div>
}
export default LinearCompList;