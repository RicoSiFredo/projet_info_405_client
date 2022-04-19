import { Form } from "react-bootstrap";
import React from "react"
function Field({name, label, val, changeValue}){
    return <Form.Group className="mb-3" controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control value={val} onInput={changeValue} type="text" placeholder={label} />
    </Form.Group>
}
export default Field;