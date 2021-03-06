import { Form } from "react-bootstrap";
import React from "react"
function Field({className, name, label, val, changeValue}){
    return <Form.Group className={className} controlId={name}>
        <Form.Control value={val} onInput={changeValue} type="text" placeholder={label} />
    </Form.Group>
}
export default Field;