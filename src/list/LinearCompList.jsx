import { Button, Modal } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { CaretDownFill, CaretRightFill } from "react-bootstrap-icons";
import Utils from "../utils/Utils";
import ComplexComp from "../component/ComplexComp";
function LinearCompList({more=false, request, refList, compList}){
    const [selected, updateSelected] = useState("");
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
    function getInverseBackground(comp){
        let res;
        if (!inRef(comp)){
            res = "bg-success";
        }
        else {
            res = "bg-primary";
        }
        return res;
    }
    let list = []
    if(Array.isArray(compList)){
        list = compList;
    }
    else if(compList!=undefined){
        for (let i = 0; i < compList.size(); i++){
            let comp = compList.get(i);
            list.push(comp)
        }
    }
    if(!(refList==[]||refList==undefined)){
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
    if(!more){
        return <div>
            {list.map((comp, index) => 
                <div 
                    key={comp.id_str} 
                    className={"round-50p d-inline ps-2 pe-2 pt-1 pb-1 "+getBackground(comp)+" mt-1 mb-1 me-2 text-white"}>
                    {comp.name}
                </div>
            )}
        </div>
    }
    else {
        return <div className="d-flex">
            {list.map((comp, index) => 
                <ComplexComp compList={compList} updateSelected={updateSelected} openned={selected==comp.id_str} request={request} getBackground={getBackground} getInverseBackground={getInverseBackground} comp={comp}>

                </ComplexComp>
            )}
        </div>
    }
}
export default LinearCompList;