import React from "react";
import { Button } from "react-bootstrap";

function Form405({error, content, onSubmit, title="", info=""}){
    return (<div>
        <div className='mt-5 text-center form-access'>
            <h3>{title}</h3>
            <p className="mt-4 mb-4">{info}</p>
            {content}
            <p>{error != undefined && error.toString()}</p>
            <Button className="w-100 btn btn-lg" variant="primary" onClick={onSubmit}>{title}</Button>
        </div>
    </div>)
}
export default Form405;