import React from "react";
import { useState } from "react";
import { CaretDownFill, CaretRightFill } from "react-bootstrap-icons";
import Utils from "../utils/Utils";
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
                <ComplexComp updateSelected={updateSelected} openned={selected==comp.id_str} request={request} getBackground={getBackground} getInverseBackground={getInverseBackground} comp={comp}>

                </ComplexComp>
            )}
        </div>
    }
}
export default LinearCompList;
function ComplexComp({request, updateSelected, openned, comp, getBackground, getInverseBackground}){
    let icon;
    if(!openned){
        icon = <CaretRightFill className="text-white mb-1 me-1"></CaretRightFill>;
    }
    else {
        icon = <CaretDownFill className="text-white me-1 mb-1"></CaretDownFill>;
    }
    function open(){
        if(!openned){
            updateSelected(comp.id_str);
        }
        else {
            updateSelected("");
        }
    }
    let contentExp;
    let firstExp = request.user.getFirstExp(comp);
    if(firstExp==Utils.currentDate()){
        contentExp = <div className="ms-1 mb-1">
            <span className="text-white">Cet utilisateur possède cette compétence mais ne l'a pas utilisée dans sa carrière professionnelle.</span>
        </div>
    }
    else {
        function plus(e){
            e.stopPropagation();
            alert("TEST")
        }
        let lastExp = request.user.getLastExp(comp);
        let duringExp = request.user.getDuringExp(comp);
        contentExp = <div className="ms-1 mb-2">
            <p className="text-white mb-1">Première experience: {Utils.getDate(firstExp, 1, "il y a ")}</p>
            <p className="text-white mb-1">Dernière experience: {Utils.getDate(lastExp, 1, "il y a ")}</p>
            <p className="text-white mb-2">Expérience total: {Utils.getDate(Utils.currentDate() - duringExp, 1)}</p>
            <span onClick={plus} className={getInverseBackground(comp)+" round-50p text-white mt-1 ps-3 pe-3 pt-1 pb-1"}>
                Voir plus
            </span>
        </div>
    }
    return <div 
        onClick={()=>{open()}}
        key={comp.id_str} 
        className={"round-50p ps-2 pe-3 pt-1 pb-1 "+getBackground(comp)+" mt-1 mb-1 me-2"}>
        
        {icon}
        <span className="text-white">{comp.name}</span>
        {openned&&contentExp}
        
    </div>

    /*
    <div>
            <p className="text-white">Première experience: 15/07/2017</p>
            <p className="text-white">Dernière experience: Aujourd'hui</p>
            <p className="text-white">Experience total: + 3 Semaine</p>
            <p className="text-white">Voir plus</p>
        </div>} */
}