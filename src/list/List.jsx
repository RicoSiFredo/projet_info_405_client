import React, { useRef } from "react";
import Gesture from "../utils/Gesture";

function List({count, generateKey, type, compute, onbottom}){

    const listInnerRef = useRef();

    function handelScroll(e){
        if(Gesture.onScrollBottom(listInnerRef, Gesture.BONUS_MERGE)){
            if(onbottom!=undefined){
                onbottom();
            }
        }
    }

    let content = Array.from(Array(count()).keys()).map((index) => 
        <div className="" key={generateKey(index)}>
            {compute(index)}
        </div>
    );
    return <div ref={listInnerRef} onScroll={(e)=>handelScroll(e)}>{content}</div>;
}
export default List;