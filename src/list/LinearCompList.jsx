import React from "react";
function LinearCompList({refList, compList}){
    function getBackground(comp){
        let found = false;
        let i = 0;
        console.log(refList)
        while(!found && i < refList.size()){
            console.log(refList.get(i))
            if (refList.get(i).id_str == comp.id_str){
                found = true;
                
            }
            i++;
        }
        let res;
        if (found){
            res = "bg-success";
        }
        else {
            res = "bg-primary";
        }
        return res;
    }
    return <div className="d-flex flex-wrap">
        {compList.map((comp, index) => 
            <div 
                key={comp.id_str} 
                className={"round-50p d-inline ps-2 pe-2 pt-1 pb-1 "+getBackground(comp)+" mt-1 mb-1 me-2 text-white"}>
                {comp.name}
            </div>
        )}
    </div>
}
export default LinearCompList;