import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { EyeFill } from "react-bootstrap-icons";
import CommentElem from "./CommentElem";
function CommentRow({request}){
    const [show, updateShow] = useState(false);
    function handleClose(e){
        e.stopPropagation()
        updateShow(false);
    }
    function openCommentList(e){
        e.stopPropagation()
        updateShow(true);
    }
    function prevent(e){
        e.stopPropagation()
    }
    return <div>
        {(request.user.moyenneFlat()!=-1?(Math.round(100*(request.user.moyenneFlat() / 20.0))/100)+ " / 5 ("+request.user.commentList.size()+") ": "Aucun commentaire")}
            {request.user.moyenneFlat()!=-1&&
            <Button onClick={openCommentList} className="ms-1 pt-0 pb-1 pe-2 ps-2 me-2">
                <EyeFill></EyeFill>
            </Button>
        }
        <div onClick={prevent}>
            <Modal show={show} className="highest" onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title>Commentaire</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        request.user.commentList.map(comment => <div key={comment.id_str}>
                            <CommentElem comment={comment}>

                            </CommentElem>
                        </div>)
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </div>
}
export default CommentRow;