import React from "react";
function LinearCompList({compList}){
    return <div className="d-flex flex-wrap">
        {compList.map((comp, index) => 
            <div 
                key={comp.id_str} 
                className="round-50p d-inline ps-3 pe-3 pt-2 pb-2 bg-primary mt-1 mb-1 me-2 text-white">
                {comp.name}
            </div>
        )}
    </div>
}
export default LinearCompList;